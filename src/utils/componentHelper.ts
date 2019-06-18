
import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  IComponentConfig,
  objForEach,
  guid,
  getDataType,
  isString,
  underlineToCapitalDump,
} from  '@/utils'

// 处理递归组件
export const renderHanlder = function(h: typeof Vue.prototype.$createElement, configs: IComponentConfig[]):  VNode[] {
  let children: VNode[] = [];
  
  configs.forEach((config: IComponentConfig) => {
    let _children: VNode [] = [];
    if (config.children) {
      _children = renderHanlder(h, config.children)
    }
    // 判断是否为文本
    if (isString(getDataType(config))) {
      children.push(config as any);
    } else {
      children.push(h(config.name, config , _children));
    }
  })
  return children;
}

export const wrapHanlder = function(e: DragEvent, parentConfig?: IComponentConfig): IComponentConfig {
  // 阻止冒泡
  e.stopPropagation();
  // to-do try-catch 待处理
  let config = JSON.parse(e.dataTransfer!.getData('config')) || {};
  config.id = guid();
  (config.attrs || (config.attrs = {}))['config-id'] = config.id;
  // 删除占位标志
  config.placeholder && delete config.placeholder;
  // 利用闭包
  let listener = {
    drop: (e: DragEvent) => {
      let el: any = e.srcElement || e.target;
      el.classList.remove('drag-over');
      wrapHanlder(e, config);
    }
  };
  if (config.type && config.type === 'html') {
    config.on = listener;
  } else if (config.droppable) {
    config.nativeOn = listener;
  }
  parentConfig && parentConfig.children!.push(config);
  return config;
}

// 代码生成
function genPropsOrAttrsStr(obj: any, type: 'attrs' | 'props') {
  let str = '';
  objForEach(obj, (key, value) => {
    // 属性去掉config-id
    if (type === 'attrs' && key === 'config-id') return;

    if (type === 'attrs') {
      str += ` ${key}="${value}"`;
    } else {
      str += ` :${key}="${value}"`;
    }
  })
  return str;
}
// 处理元素dom
function dealHtmlElement(config: IComponentConfig): IComponentConfig {
  let configCopy = _.cloneDeep(config);
  configCopy.name = configCopy.attrs!.tag;
  if (configCopy.attrs!.text) {
    configCopy.children = [configCopy.attrs!.text];
  }
  configCopy.attrs = {};
  return configCopy;
}

export const genCode = (configs: IComponentConfig[]) => {
  let content = '';
  configs.forEach((config: IComponentConfig) => {
    // 文本元素
    if (isString(getDataType(config))) {
      content += config;
      return;
    }
    // 处理元素html元素Dom
    if (config.type === 'html') {
      config = dealHtmlElement(config);
    }
    let { name, attrs, props } = config;
    let attrsStr = attrs ? genPropsOrAttrsStr(attrs, 'attrs') : '';
    let propsStr = props ? genPropsOrAttrsStr(props, 'props') : '';
    // 处理class
    if (config.class) {
      attrsStr += `class="${config.class.split(',').join(' ')}"`;
    }
    
    content += `<${name}${propsStr}${attrsStr}>`;
    if (config.children) {
      content += genCode(config.children);
    }
    content += `</${name}>`
  })
  return content;
}

// 递归查找删除
export const deleteComp = (configs: IComponentConfig[], configId: string) => {
  configs.some((config: IComponentConfig, index: number) => {
    if (config.id === configId) {
      configs.splice(index, 1);
      return true;
    }
    if (config.children) {
      return deleteComp(config.children, configId);
    }
    return false;
  })
}