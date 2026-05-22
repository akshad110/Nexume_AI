const SECTION_PATTERNS = [
  {
    key: 'missing',
    title: 'Missing Keywords & Skills',
    icon: 'keywords',
    match: /missing\s*keywords?\s*\/?\s*skills?/i,
  },
  {
    key: 'alignment',
    title: 'Role Alignment',
    icon: 'alignment',
    match: /role\s*alignment/i,
  },
  {
    key: 'suggestions',
    title: 'Improvement Suggestions',
    icon: 'suggestions',
    match: /suggestions?\s*(?:for\s*improvement)?/i,
  },
]

/** Remove markdown symbols; keep plain text */
export function cleanMarkdownText(text) {
  if (!text) return ''
  return text
    .replace(/\r\n/g, '\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*•]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractScore(text) {
  const patterns = [
    /match\s*score\s*[:(]\s*(\d{1,3})/i,
    /ats\s*score\s*[:(]\s*(\d{1,3})/i,
    /score\s*[:(]\s*(\d{1,3})\s*(?:\/\s*100|%)?/i,
    /(\d{1,3})\s*\/\s*100/,
    /(\d{1,3})\s*%\s*match/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const value = Number.parseInt(match[1], 10)
      if (value >= 0 && value <= 100) return value
    }
  }
  return null
}

function matchSectionKey(headerText) {
  const h = cleanMarkdownText(headerText).toLowerCase()
  if (/match\s*score/i.test(h)) return null
  const found = SECTION_PATTERNS.find((s) => s.match.test(h))
  return found?.key ?? null
}

/** Split API text into main sections (no duplicates) */
function splitMainSections(text) {
  const normalized = text.replace(/\r\n/g, '\n')
  const chunks = normalized.split(
    /(?=\n\s*(?:(?:#{1,3}\s*)?(?:\d+[.)]\s+)?(?:Match\s*Score|Missing\s*Keywords|Role\s*Alignment|Suggestions?\s*(?:for\s*Improvement)?)[^\n]*))/i,
  )

  const byKey = new Map()

  chunks.forEach((chunk) => {
    const trimmed = chunk.trim()
    if (!trimmed) return

    const headerMatch = trimmed.match(
      /^(?:(?:#{1,3}\s*)?(?:\d+[.)]\s+)?)?([^\n:]+):?\s*\n?([\s\S]*)$/i,
    )
    if (!headerMatch) return

    const header = headerMatch[1].trim()
    const body = headerMatch[2]?.trim() || ''
    const key = matchSectionKey(header)

    if (!key || !body) return
    if (!byKey.has(key)) {
      const config = SECTION_PATTERNS.find((s) => s.key === key)
      byKey.set(key, {
        key,
        title: config.title,
        icon: config.icon,
        blocks: parseSectionBlocks(body),
      })
    }
  })

  return SECTION_PATTERNS.map((s) => byKey.get(s.key)).filter(Boolean)
}

/** Parse section body into paragraphs, subheadings, and lists */
export function parseSectionBlocks(body) {
  const blocks = []
  const lines = body.replace(/\r\n/g, '\n').split('\n')

  let listItems = []
  let paragraphLines = []

  const flushParagraph = () => {
    if (paragraphLines.length) {
      const text = cleanMarkdownText(paragraphLines.join(' '))
      if (text) blocks.push({ type: 'paragraph', text })
      paragraphLines = []
    }
  }

  const flushList = () => {
    if (listItems.length) {
      blocks.push({
        type: 'list',
        items: listItems.map((item) => cleanMarkdownText(item)).filter(Boolean),
      })
      listItems = []
    }
  }

  const pushSubheading = (label, content = '') => {
    flushParagraph()
    flushList()
    const cleanLabel = cleanMarkdownText(label)
    const cleanContent = cleanMarkdownText(content)
    if (!cleanLabel) return

    const last = blocks[blocks.length - 1]
    if (last?.type === 'subheading' && !last.content && cleanContent) {
      last.content = cleanContent
      return
    }

    blocks.push({
      type: 'subheading',
      label: cleanLabel,
      content: cleanContent || '',
    })
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    if (/^#{1,6}\s+/.test(line)) {
      pushSubheading(line.replace(/^#{1,6}\s+/, '').replace(/^\d+[.)]\s*/, ''))
      continue
    }

    const boldOnly = line.match(/^\*\*([^*]+)\*\*:?\s*$/)
    if (boldOnly) {
      pushSubheading(boldOnly[1])
      continue
    }

    const boldWithRest = line.match(/^\*\*([^*]+)\*\*:?\s*(.+)$/)
    if (boldWithRest) {
      pushSubheading(boldWithRest[1], boldWithRest[2])
      continue
    }

    const labelColon = line.match(/^([A-Za-z][A-Za-z0-9\s/&-]+):\s*(.+)$/)
    if (
      labelColon &&
      labelColon[1].length < 50 &&
      !labelColon[1].match(/^(https?|www)/i)
    ) {
      pushSubheading(labelColon[1], labelColon[2])
      continue
    }

    if (/^[-*•]\s+/.test(line) || /^\*[A-Za-z]/.test(line)) {
      flushParagraph()
      const item = line
        .replace(/^[-*•]\s+/, '')
        .replace(/^\*([A-Za-z])/, '$1')
      listItems.push(item)
      continue
    }

    const starSection = line.match(/^\*([A-Z][^*:]+):\*?\s*(.*)$/)
    if (starSection) {
      pushSubheading(starSection[1], starSection[2])
      continue
    }

    flushList()
    paragraphLines.push(line)
  }

  flushParagraph()
  flushList()

  return blocks.filter((b) => {
    if (b.type === 'paragraph') return b.text.length > 0
    if (b.type === 'list') return b.items.length > 0
    if (b.type === 'subheading') return b.label.length > 0
    return false
  })
}

export function getScoreLabel(score) {
  if (score == null) return { label: 'Analyzing', color: 'text-muted-foreground' }
  if (score >= 80) return { label: 'Excellent Match', color: 'text-emerald-600' }
  if (score >= 60) return { label: 'Good Match', color: 'text-amber-600' }
  if (score >= 40) return { label: 'Needs Work', color: 'text-orange-600' }
  return { label: 'Low Match', color: 'text-red-600' }
}

export function getScoreRingColor(score) {
  if (score == null) return '#9f5bff'
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  if (score >= 40) return '#f97316'
  return '#ef4444'
}

export function parseAtsAnalysis(text) {
  if (!text?.trim()) {
    return { score: null, sections: [], summary: '', raw: '' }
  }

  const score = extractScore(text)
  const sections = splitMainSections(text)

  return {
    score,
    sections,
    summary: '',
    raw: cleanMarkdownText(text),
  }
}
