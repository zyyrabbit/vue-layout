
import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  IComponentConfig,
  objForEach,
  guid,
  getDataType,
  isString,
  deepCopy,
  specCompNamesMap,
} from  '@/utils'
import { MessageBox } from 'element-ui';

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

export const wrapHanlder = function(e: DragEvent, parentConfig?: IComponentConfig): IComponentConfig | null {
  // 阻止冒泡
  e.stopPropagation();
  let config: any;
  try {
    config = JSON.parse(e.dataTransfer!.getData('config')) || {};
  } catch(e) {
    console.error(e);
    return null;
  }
  // 处理g2组件,添加id
  if (config.name.indexOf('g2') > -1) {
    (config.props || (config.props = {})).id = guid();
  }

  config.id = guid();
  config.layout.i = config.id; // vue-grid-layout
  (config.attrs || (config.attrs = {}))['config-id'] = config.id;
  // 删除占位标志
  config.placeholder && delete config.placeholder;
  // 利用闭包--需要确定一下闭包是否泄漏
  let listener = {
    drop: (e: DragEvent) => {
      let el: any = e.srcElement || e.target;
      el.classList.remove('drag-over');
      wrapHanlder(e, config);
    }
  };
  // 处理原生html
  if (config.type && config.type === 'html') {
    config.on = listener;
  } else if (config.droppable) {
    config.nativeOn = listener;
  }
  // 处理组件是否可以嵌套
  if (specCompNamesMap[config.name] && 
      (!parentConfig || (config.parentName && config.parentName !== parentConfig.name))) {
    MessageBox.alert(`组件${config.name}, 只能拖入${specCompNamesMap[config.name]}`);
    return null;
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
  let configCopy = deepCopy(config);
  
  configCopy.name = configCopy.attrs!.tag;
  if (configCopy.attrs!.text) {
    configCopy.children = [configCopy.attrs!.text];
  }
  configCopy.attrs = {};
  return configCopy;
}

export const genCode = (configs: IComponentConfig[]) => {
  let codeStr = '';
  configs.forEach((config: IComponentConfig) => {
    // 文本元素
    if (isString(getDataType(config))) {
      codeStr += config;
      return;
    }
    // 处理元素html元素Dom
    if (config.type === 'html') {
      config = dealHtmlElement(config);
    }

    let { name, attrs, props } = config;
    let attrStr = attrs ? genPropsOrAttrsStr(attrs, 'attrs') : '';
    let propsStr = props ? genPropsOrAttrsStr(props, 'props') : '';
    
    // 处理class
    if (config.class) {
      attrStr += ` class="${config.class.split(',').join(' ')}"`;
    }
    
    codeStr += `<${name}${propsStr}${attrStr}>`;

    if (config.children) {
      codeStr += genCode(config.children);
    }

    codeStr += `</${name}>`
  })
  return codeStr;
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