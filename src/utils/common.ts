type index = {[index: string]: any}
type callback = (key: string, value?: any, index?: number) => void

export const objForEach = (obj: index, callback: callback) => {
  Object.keys(obj).forEach((key: string, index: number) => {
    callback(key, obj[key], index)
  })
}