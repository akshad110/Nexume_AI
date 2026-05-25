import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
  useMemo,
} from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const ChatInputContext = createContext(undefined)

function useChatInputContext() {
  const context = useContext(ChatInputContext)
  if (!context) {
    throw new Error('useChatInputContext must be used within ChatInputProvider')
  }
  return context
}

const SendButton = memo(({ isDisabled }) => (
  <button
    type="submit"
    aria-label="Send message"
    disabled={isDisabled}
    className={cn(
      'z-20 ml-auto flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full border-0 p-0 transition-all',
      isDisabled
        ? 'cursor-not-allowed bg-gray-400 text-white/60 opacity-40'
        : 'cursor-pointer bg-[#0A1217] text-white opacity-90 hover:opacity-100 hover:shadow-lg',
    )}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="block">
      <path
        d="M16 22L16 10M16 10L11 15M16 10L21 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
))

const OptionsMenu = memo(({ isOpen, onSelect, menuOptions }) => {
  if (!isOpen) return null
  return (
    <div className="absolute left-0 top-full z-30 mt-1 min-w-[120px] overflow-hidden rounded-lg bg-white shadow-lg">
      <ul className="py-1">
        {menuOptions.map((option) => (
          <li
            key={option}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            onClick={() => onSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
})

const OptionTag = memo(({ option, onRemove }) => (
  <div className="flex items-center gap-1 rounded-md bg-gray-900/10 px-2 py-1 text-xs text-gray-900">
    <span>{option}</span>
    <button
      type="button"
      onClick={() => onRemove(option)}
      className="flex h-4 w-4 items-center justify-center rounded-full text-gray-600 hover:bg-gray-900/10"
    >
      ×
    </button>
  </div>
))

const GlowEffects = memo(({ glowIntensity, mousePosition, animationDuration, enabled }) => {
  if (!enabled) return null
  return (
    <>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-2xl" />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          boxShadow: `0 0 0 1px rgba(147, 51, 234, ${0.2 * glowIntensity}), 0 0 12px rgba(147, 51, 234, ${0.3 * glowIntensity})`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, rgba(147,51,234,0.1) 0%, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-25"
        style={{ transitionDuration: `${animationDuration * 2}ms` }}
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </div>
    </>
  )
})

const RippleEffects = memo(({ ripples, enabled }) => {
  if (!enabled || !ripples.length) return null
  return ripples.map((ripple) => (
    <div
      key={ripple.id}
      className="pointer-events-none absolute blur-sm"
      style={{ left: ripple.x - 25, top: ripple.y - 25, width: 50, height: 50 }}
    >
      <div className="h-full w-full animate-ping rounded-full bg-gradient-to-r from-purple-400/15 via-pink-400/10 to-blue-400/15" />
    </div>
  ))
})

const InputArea = memo(
  ({ value, setValue, placeholder, handleKeyDown, disabled, isSubmitDisabled }) => {
    const textareaRef = useRef(null)

    useEffect(() => {
      if (!textareaRef.current) return
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      const maxHeight = 22 * 4 + 16
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }, [value])

    return (
      <div className="relative flex h-full flex-1 items-center">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Message Input"
          rows={1}
          disabled={disabled}
          className="relative z-20 min-h-8 max-h-24 w-full resize-none overflow-y-auto border-0 bg-transparent px-3 py-1 pr-10 text-left text-sm text-gray-900 outline-none placeholder:text-gray-500"
          style={{ lineHeight: '22px' }}
        />
        <SendButton isDisabled={isSubmitDisabled} />
      </div>
    )
  },
)

const MenuButton = memo(
  ({ toggleMenu, menuRef, isMenuOpen, onSelectOption, menuOptions }) => (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Menu options"
        className="ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/10 text-gray-900 transition-all hover:bg-gray-900/15"
      >
        <Plus size={16} />
      </button>
      <OptionsMenu isOpen={isMenuOpen} onSelect={onSelectOption} menuOptions={menuOptions} />
    </div>
  ),
)

const SelectedOptions = memo(({ options, onRemove }) => {
  if (!options.length) return null
  return (
    <div className="relative z-20 mt-2 flex flex-wrap gap-2 px-3">
      {options.map((option) => (
        <OptionTag key={option} option={option} onRemove={onRemove} />
      ))}
    </div>
  )
})

export function ChatGPTInput({
  placeholder = 'Describe your background, role, and skills…',
  onSubmit,
  disabled = false,
  glowIntensity = 0.4,
  expandOnFocus = true,
  animationDuration = 500,
  backgroundOpacity = 0.92,
  showEffects = true,
  menuOptions = [],
  showModeMenu = false,
  className,
  formClassName,
}) {
  const [value, setValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [ripples, setRipples] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const containerRef = useRef(null)
  const menuRef = useRef(null)
  const throttleRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (value.trim() && onSubmit && !disabled) {
        onSubmit(value.trim())
        setValue('')
      }
    },
    [value, onSubmit, disabled],
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    },
    [handleSubmit],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!showEffects || !containerRef.current || throttleRef.current) return
      throttleRef.current = window.setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          })
        }
        throttleRef.current = null
      }, 50)
    },
    [showEffects],
  )

  const addRipple = useCallback(
    (x, y) => {
      if (!showEffects || ripples.length >= 5) return
      const id = Date.now()
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    },
    [ripples.length, showEffects],
  )

  const handleClick = useCallback(
    (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      addRipple(e.clientX - rect.left, e.clientY - rect.top)
    },
    [addRipple],
  )

  const selectOption = useCallback((option) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev : [...prev, option]))
    setIsMenuOpen(false)
  }, [])

  const removeOption = useCallback((option) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt !== option))
  }, [])

  const contextValue = useMemo(
    () => ({
      mousePosition,
      ripples,
      addRipple,
      animationDuration,
      glowIntensity,
      showEffects,
    }),
    [mousePosition, ripples, addRipple, animationDuration, glowIntensity, showEffects],
  )

  const isSubmitDisabled = disabled || !value.trim()
  const hasModeSelected = selectedOptions.length > 0
  const shouldExpandOnFocus = expandOnFocus && !hasModeSelected

  return (
    <ChatInputContext.Provider value={contextValue}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'relative z-10 mx-auto min-h-12 w-full transition-all ease-out',
          shouldExpandOnFocus && 'focus-within:max-w-3xl',
          formClassName,
          className,
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className="group relative flex min-h-full w-full flex-col overflow-visible rounded-3xl border border-gray-200/80 p-2 shadow-lg backdrop-blur-xl"
          style={{
            backgroundColor: `rgba(255,255,255,${backgroundOpacity})`,
          }}
        >
          <GlowEffects
            glowIntensity={glowIntensity}
            mousePosition={mousePosition}
            animationDuration={animationDuration}
            enabled={showEffects}
          />
          <RippleEffects ripples={ripples} enabled={showEffects} />

          <div className="relative z-20 flex items-center">
            {showModeMenu && menuOptions.length > 0 ? (
              <MenuButton
                toggleMenu={() => setIsMenuOpen((v) => !v)}
                menuRef={menuRef}
                isMenuOpen={isMenuOpen}
                onSelectOption={selectOption}
                menuOptions={menuOptions}
              />
            ) : null}

            <InputArea
              value={value}
              setValue={setValue}
              placeholder={placeholder}
              handleKeyDown={handleKeyDown}
              disabled={disabled}
              isSubmitDisabled={isSubmitDisabled}
            />
          </div>

          {showModeMenu ? (
            <SelectedOptions options={selectedOptions} onRemove={removeOption} />
          ) : null}
        </div>
      </form>
    </ChatInputContext.Provider>
  )
}

export default ChatGPTInput
