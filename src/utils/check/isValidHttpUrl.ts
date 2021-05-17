export default (url: string) => {
  let link

  try {
    link = new URL(url)
  } catch (_) {
    return false
  }

  return link.protocol === 'http:' || link.protocol === 'https:'
}
