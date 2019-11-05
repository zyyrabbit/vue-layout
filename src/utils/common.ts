export type index = {[index: string]: any}
export type callback = (key: string, value?: any, index?: number) => void

// 获取数据类型
export const getDataType = (data: any) => {
  if (typeof data !== 'object') {
    return typeof data
  }
  let toString = Object.prototype.toString;
 return toString.call(data).slice(8, -1).toLowerCase();
}

export const isNumber = (data: string) => data === 'number';
export const isString = (data: any) => data === 'string';


// 下划线转驼峰
export const underlineToDump = (str: string) => str.replace(/-(\w)/g, (match: string, pos: string) => pos.toUpperCase())

// 驼峰转下划线
export const dumpToHyphenate = (str: string) => str.replace(/\B([A-Z])/g, '-$1').toLowerCase()

// 首字母大写
export const capital = (str: string) => str.replace(/^\w/, function(word: string) {
  return  word.toUpperCase();
})
// 首字母大写驼峰
export const underlineToCapitalDump = (str: string) => capital(underlineToDump(str));
// 对象遍历
export const objForEach = (obj: index = {}, callback: callback) => {
  Object.keys(obj).forEach((key: string, index: number) => {
    callback(key, obj[key], index)
  })
}


/* 广度非递归遍历 */
export const breadthTraverse = (node: any, prop: string , callback: (item: any) => boolean) => {
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
// 节流函数
export const throtter = function(fn: Function, fre: number) {
  let timer: any;
  return function(...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(null, args);
        timer = null;
      }, fre)
    }
  }
}
// 对象数组过滤
export function find(ary: Array<any>, fn: (value: any, index: number, array: any[]) => any) {
  return ary.filter(fn)[0]
}

const primitive = [
  'null',
  'boolean',
  'string',
  'number',
  'undefined',
  'function'
]
/*
* JSON深度拷贝
* @param: {obj}
* @return: {obj} copy
*/
export function copyByJson(obj: index) {
  let rst
  try {
    rst = JSON.parse(JSON.stringify(obj))
  } catch (e) {
    console.error('JSON.Stringfy copy wrong！')
  }
  return rst
}

/*
* 深度拷贝
* @param: {obj} Object
* @return: {String}
*/
export function deepCopy(obj: index, cache: any[] = []) {
  let type = getDataType(obj);
  // 处理非引用类型，注意这里将函数也归为此类
  if (primitive.indexOf(type) !== -1) {
    return obj
  }
  // 处理对象嵌套情况
  let hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }
  let copy
  switch (type) {
    case 'object': {
      // 保持原型链继承关系
      copy = Object.create(Object.getPrototypeOf(obj))
      break
    }
    case 'array': {
      copy = []
      break
    }
    case 'regexp':
    case 'date':
    case 'boolean': // new Boolean(true)
    case 'string':
    case 'number': {
      return new obj.constructor(obj)
    }
    case 'symbol': {
      const symbolValueOf = Symbol.prototype.valueOf
      return symbolValueOf ? symbolValueOf.call(obj) : {}
    }
    default: {
      return undefined
    }
  }
  cache.push({
    original: obj,
    copy
  })
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key], cache)
    }
  }
  return copy
}

export const genRandom = (min: number, max: number) => () => {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}