import addZero from '../string/addZero'

export default (minutes: number | string): string => {
  const hourse = +minutes / 60
  const rhourse = Math.floor(hourse)
  const cminutes = (hourse - rhourse) * 60
  const rminutes = Math.round(cminutes)

  return `${addZero(rhourse)}:${addZero(rminutes)}`
}
