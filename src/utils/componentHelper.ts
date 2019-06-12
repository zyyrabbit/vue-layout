
import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  IComponentConfig,
  objForEach,
  guid
} from  '@/utils'

// 处理递归组件
export const renderHanlder = function(h: typeof Vue.prototype.$createElement, configs: IComponentConfig[]):  VNode[] {
  let children: VNode[] = [];
  
  configs.forEach((config: IComponentConfig) => {
    let _children: VNode[] = [];
    if (config.children) {
      _children = renderHanlder(h, config.children)
    }
    children.push(h(config.name, config , _children));
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
  if (config.droppable) {
    config.nativeOn = {
      dragover: (e: DragEvent) => { e.preventDefault() },
      drop: (e: DragEvent) => { 
        wrapHanlder(e, config);
      }
    }
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
      str += `${key}="${value}"`;
    } else {
      str += `:${key}="${value}"`;
    }
  })
  return str;
}

export const recursiveTraverse = (configs: IComponentConfig[]) => {
  let content = '';
  configs.forEach((config: IComponentConfig) => {
    let { name, attrs, props } = config;
    let attrsStr = attrs ? genPropsOrAttrsStr(attrs, 'attrs') : '';
    let propsStr = props ? genPropsOrAttrsStr(props, 'props') : '';
    content += `<${name} ${propsStr} ${attrsStr}>`;
    if (config.children) {
      content += recursiveTraverse(config.children);
    }
    content += `</${name}>`
  })
  return content;
}