interface IObject {
  [key: string]: any
}
export default (attrs: string[], obj: IObject) => {
  const newObj: IObject = {}
  attrs.forEach((attr) => {
    if (!Object.prototype.hasOwnProperty.call(obj, attr)) return
    newObj[attr] = obj[attr]
  })

  return newObj
}
