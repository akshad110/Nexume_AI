const SECTION_PATTERNS = [
  {
    key: 'missing',
    title: 'Missing Keywords & Skills',
    icon: 'keywords',
    patterns: [
      /missing\s*keywords?\s*\/?\s*skills?/i,
      /missing\s*keywords?/i,
      /missing\s*skills?/i,
      /keywords?\s*(?:and|&)\s*skills?\s*(?:gap|missing)?/i,
    ],
  },
  {
    key: 'alignment',
    title: 'Role Alignment',
    icon: 'alignment',
    patterns: [/role\s*alignment/i, /alignment\s*with\s*(?:the\s*)?role/i],
  },
  {
    key: 'suggestions',
    title: 'Improvement Suggestions',
    icon: 'suggestions',
    patterns: [
      /suggestions?\s*for\s*improvement/i,
      /improvement\s*suggestions?/i,
      /suggestions?/i,
      /recommendations?/i,
    ],
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

function normalizeHeaderLine(line) {
  return cleanMarkdownText(line)
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\d+[.)]\s+/, '')
    .trim()
}

function extractScore(text) {
  const patterns = [
    /match\s*score[^0-9]{0,24}(\d{1,3})\s*(?:\/\s*100|%)/i,
    /ats\s*score[^0-9]{0,24}(\d{1,3})\s*(?:\/\s*100|%)/i,
    /(\d{1,3})\s*\/\s*100/,
    /(\d{1,3})\s*%\s*match/i,
    /match\s*score[^0-9]{0,12}(\d{1,3})\b/i,
    /score[^0-9]{0,12}(\d{1,3})\s*(?:\/\s*100|%)/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const value = Number.parseInt(match[1], 10)
      if (value >= 1 && value <= 100) return value
    }
  }
  return null
}

function matchSectionKey(headerText) {
  const h = normalizeHeaderLine(headerText).toLowerCase()
  if (!h || /match\s*score/i.test(h) || /^overall\b/i.test(h)) return null

  for (const config of SECTION_PATTERNS) {
    if (config.patterns.some((pattern) => pattern.test(h))) {
      return config.key
    }
  }
  return null
}

function extractBodyAfterHeader(headerLine, followingLines) {
  const parts = []
  const colonIdx = headerLine.indexOf(':')
  if (colonIdx !== -1) {
    const inline = headerLine.slice(colonIdx + 1).trim()
    if (inline) parts.push(inline)
  }
  if (followingLines.length) {
    parts.push(followingLines.join('\n'))
  }
  return parts.join('\n').trim()
}

/** Line-by-line scan — works with Gemini markdown & numbered lists */
function splitMainSectionsByLines(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const markers = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const key = matchSectionKey(line)
    if (key && !markers.some((m) => m.key === key)) {
      markers.push({ key, lineIndex: i, headerLine: line })
    }
  }

  const byKey = new Map()

  markers.forEach((marker, index) => {
    const endLine = markers[index + 1]?.lineIndex ?? lines.length
    const following = lines.slice(marker.lineIndex + 1, endLine)
    const body = extractBodyAfterHeader(marker.headerLine, following)

    if (!body) return

    const config = SECTION_PATTERNS.find((s) => s.key === marker.key)
    byKey.set(marker.key, {
      key: marker.key,
      title: config.title,
      icon: config.icon,
      blocks: parseSectionBlocks(body),
    })
  })

  return SECTION_PATTERNS.map((s) => byKey.get(s.key)).filter(Boolean)
}

/** Regex chunk split — backup when headers share a paragraph */
function splitMainSectionsByRegex(text) {
  const normalized = text.replace(/\r\n/g, '\n')
  const chunks = normalized.split(
    /(?=(?:^|\n)\s*(?:(?:#{1,3}\s*)?(?:\d+[.)]\s+)?(?:\*\*)?\s*(?:Missing\s*Keywords|Role\s*Alignment|Suggestions?\s*(?:for\s*Improvement)?)[^\n]*))/im,
  )

  const byKey = new Map()

  chunks.forEach((chunk) => {
    const trimmed = chunk.trim()
    if (!trimmed) return

    const lines = trimmed.split('\n')
    const firstLine = lines[0]?.trim() || ''
    const key = matchSectionKey(firstLine)
    if (!key) return

    const body = extractBodyAfterHeader(firstLine, lines.slice(1))
    if (!body) return

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

/** Last resort: slice raw text at section header positions */
function splitMainSectionsByIndex(text) {
  const normalized = text.replace(/\r\n/g, '\n')
  const headerRegex =
    /(?:^|\n)\s*(?:(?:#{1,3}\s*)?(?:\d+[.)]\s+)?(?:\*\*)?\s*)(Missing\s*Keywords[^\n]*|Role\s*Alignment[^\n]*|Suggestions?[^\n]*)/gi

  const hits = []
  let match
  while ((match = headerRegex.exec(normalized)) !== null) {
    const headerLine = match[1].trim()
    const key = matchSectionKey(headerLine)
    if (!key) continue
    if (hits.some((h) => h.key === key)) continue
    hits.push({ key, index: match.index + match[0].indexOf(headerLine) })
  }

  if (!hits.length) return []

  hits.sort((a, b) => a.index - b.index)

  const byKey = new Map()
  hits.forEach((hit, i) => {
    const start = hit.index
    const end = hits[i + 1]?.index ?? normalized.length
    const slice = normalized.slice(start, end).trim()
    const lines = slice.split('\n')
    const body = extractBodyAfterHeader(lines[0] || '', lines.slice(1))
    if (!body) return

    const config = SECTION_PATTERNS.find((s) => s.key === hit.key)
    byKey.set(hit.key, {
      key: hit.key,
      title: config.title,
      icon: config.icon,
      blocks: parseSectionBlocks(body),
    })
  })

  return SECTION_PATTERNS.map((s) => byKey.get(s.key)).filter(Boolean)
}

function splitMainSections(text) {
  const strategies = [
    splitMainSectionsByLines,
    splitMainSectionsByRegex,
    splitMainSectionsByIndex,
  ]

  for (const strategy of strategies) {
    const sections = strategy(text)
    if (sections.length > 0) return sections
  }

  return []
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

    if (/^[-*•]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
      flushParagraph()
      const item = line.replace(/^[-*•]\s+/, '').replace(/^\d+[.)]\s+/, '')
      listItems.push(item)
      continue
    }

    if (/^\*[A-Za-z]/.test(line)) {
      flushParagraph()
      listItems.push(line.replace(/^\*([A-Za-z])/, '$1'))
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

/** When headers cannot be found, still show separate cards from the raw report */
function buildFallbackSections(raw) {
  const cleaned = cleanMarkdownText(raw)
  if (!cleaned) return []

  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (paragraphs.length >= 2) {
    const scoreChunk = paragraphs.find((p) => /match\s*score/i.test(p))
    const contentParagraphs = paragraphs.filter((p) => p !== scoreChunk)

    const chunkSize = Math.max(
      1,
      Math.ceil(contentParagraphs.length / SECTION_PATTERNS.length),
    )

    return SECTION_PATTERNS.map((config, index) => {
      const start = index * chunkSize
      const slice = contentParagraphs.slice(start, start + chunkSize)
      if (!slice.length) return null

      return {
        key: config.key,
        title: config.title,
        icon: config.icon,
        blocks: parseSectionBlocks(slice.join('\n\n')),
      }
    }).filter((s) => s?.blocks?.length)
  }

  return [
    {
      key: 'suggestions',
      title: 'Full report',
      icon: 'suggestions',
      blocks: [{ type: 'paragraph', text: cleaned }],
    },
  ]
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
  let sections = splitMainSections(text)

  if (sections.length === 0) {
    sections = buildFallbackSections(text)
  }

  return {
    score,
    sections,
    summary: '',
    raw: cleanMarkdownText(text),
  }
}
