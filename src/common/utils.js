export function tgUrlToCode(url) {
  console.log(url, 'URL')
  const lastSlashIndex = url.lastIndexOf('/')
  return url.substring(lastSlashIndex + 1)
}

 // Преобразовать окончание
export function abbreviateNumber(value = 0){
  if (value >= 1e12) {
    return (value / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return value.toString();
  }
}
