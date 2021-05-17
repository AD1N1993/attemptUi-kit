export default (arr: any[], size = 5) => {
  const startArr = arr
  const endArr = []
  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    endArr[i] = startArr.slice(i * size, i * size + size)
  }

  return endArr
}
