/**
 * Extract plain text from uploaded resume files in the browser
 * so ATS analysis never depends on server-side PDF parsing alone.
 */

export async function extractTextFromPdfFile(file) {
  const pdfjs = await import('pdfjs-dist')

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()

  const data = new Uint8Array(await file.arrayBuffer())
  const pdf = await pdfjs.getDocument({ data }).promise

  const parts = []
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    if (pageText.trim()) parts.push(pageText)
  }

  return parts.join('\n\n').trim()
}

export async function extractResumeFileText(file) {
  if (!file) return ''

  const name = (file.name || '').toLowerCase()

  if (file.type === 'text/plain' || name.endsWith('.txt')) {
    return (await file.text()).trim()
  }

  if (file.type === 'application/pdf' || name.endsWith('.pdf')) {
    try {
      return await extractTextFromPdfFile(file)
    } catch (err) {
      console.error('PDF text extraction failed:', err)
      return ''
    }
  }

  return ''
}
