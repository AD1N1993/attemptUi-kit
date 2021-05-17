export default (num: number | string) => {
  let number: string = '' + num

  if (num < 10) {
    number = '0' + num
  }

  return number
}
