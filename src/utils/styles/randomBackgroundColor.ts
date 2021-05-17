export default (): string => {
  const r = Math.floor(150 + Math.random() * (255 + 1 - 150))
  const g = Math.floor(150 + Math.random() * (255 + 1 - 150))
  const b = Math.floor(150 + Math.random() * (255 + 1 - 150))

  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
