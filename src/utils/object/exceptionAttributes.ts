import omit from 'object.omit'

type TObject<T = any> = Record<string, T>

const exceptAttrs: string[] = ['@context', '@type']

/**
 * Исключает лишние ключи из объекта
 * @param obj
 */
const exception = (obj: TObject) => {
  const newObj: TObject = {}
  const omitObject: TObject = omit(obj, exceptAttrs)
  if (Array.isArray(obj)) {
    return obj
  } else {
    Object.keys(omitObject).forEach(
      (attr) =>
        (newObj[attr] =
          !Array.isArray(omitObject[attr]) &&
          typeof omitObject[attr] === 'object' &&
          omitObject[attr] !== null
            ? omit(exception(obj[attr]), exceptAttrs)
            : omitObject[attr]),
    )
    return newObj
  }
}

export default exception
