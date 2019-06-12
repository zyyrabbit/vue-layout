type index = {[index: string]: any}
type callback = (key: string, value?: any, index?: number) => void

export const objForEach = (obj: index, callback: callback) => {
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