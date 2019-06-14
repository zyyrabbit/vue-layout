export type index = {[index: string]: any}
export type callback = (key: string, value?: any, index?: number) => void
// 获取数据类型
export const getDataType = (data: any) => Object.prototype.toString.call(data).slice(8, -1);
export const isNumber = (data: string) => data === 'Number';
// 下划线转驼峰
export const underlineToDump = (str: string) => str.replace(/-(\w)/g, function(match: string, pos: string) {
    return  pos.toUpperCase();
  })
// 首字母大写
export const capital = (str: string) => str.replace(/^\w/, function(word: string) {
  return  word.toUpperCase();
})
// 对象遍历
export const objForEach = (obj: index = {}, callback: callback) => {
  Object.keys(obj).forEach((key: string, index: number) => {
    callback(key, obj[key], index)
  })
}
/* 广度非递归遍历 */
export const breadthTraverse = (node: any, prop: string ,callback: (item: any) => boolean) => {
  let queue,
      current: any,
      result = [];
  queue = Array.isArray(node) ? [...node] : [node];

  while (queue.length > 0) {
    current = queue.shift();
    if (callback(current)) {
      result = current;
      break;
    }
    if (current[prop]) {
      queue = queue.concat(current[prop]);
    }
  }
  return result;
}