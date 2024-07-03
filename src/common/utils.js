export function tgUrlToCode(url) {
  console.log(url, 'URL')
  const lastSlashIndex = url.lastIndexOf('/')
  return url.substring(lastSlashIndex + 1)
}
