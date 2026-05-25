/** Flatten Strapi v4/v5 entity if fields live under attributes. */
export function unwrapStrapiEntity(data) {
  if (!data || typeof data !== 'object') return data
  if (data.attributes && typeof data.attributes === 'object') {
    return {
      ...data.attributes,
      id: data.id,
      documentId: data.documentId ?? data.id,
    }
  }
  return data
}

/** Read linkedin/github from top-level fields or programmingSkills JSON fallback. */
export function getSocialLink(resumeInfo, key) {
  if (!resumeInfo) return ''
  const top = resumeInfo[key]
  if (typeof top === 'string' && top.trim()) return top.trim()

  const ps = resumeInfo.programmingSkills
  if (ps && typeof ps === 'object' && typeof ps[key] === 'string' && ps[key].trim()) {
    return ps[key].trim()
  }

  const attrs = resumeInfo.attributes
  if (attrs && typeof attrs[key] === 'string' && attrs[key].trim()) {
    return attrs[key].trim()
  }

  return ''
}

/** Ensure URL works as href (add https if missing). */
export function toResumeHref(url) {
  const trimmed = (url || '').trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function getSocialHref(resumeInfo, key) {
  return toResumeHref(getSocialLink(resumeInfo, key))
}

export function hasSocialLinks(resumeInfo) {
  return Boolean(getSocialHref(resumeInfo, 'linkedin') || getSocialHref(resumeInfo, 'github'))
}

/** True if a website string is already shown as a social icon (avoid duplicate URL text). */
export function isSocialWebsiteUrl(url) {
  const lower = (url || '').trim().toLowerCase()
  if (!lower) return false
  return (
    lower.includes('linkedin.com') ||
    lower.includes('github.com') ||
    lower.includes('linkedin.com/') ||
    lower.includes('github.com/')
  )
}

/** Merge social URLs into programmingSkills for Strapi until dedicated columns sync. */
export function mergeProgrammingSkillsWithSocial(resumeInfo, { linkedin, github }) {
  const base =
    resumeInfo?.programmingSkills && typeof resumeInfo.programmingSkills === 'object'
      ? { ...resumeInfo.programmingSkills }
      : { languages: '', technologies: '' }

  return {
    ...base,
    linkedin: linkedin ?? getSocialLink(resumeInfo, 'linkedin'),
    github: github ?? getSocialLink(resumeInfo, 'github'),
  }
}
