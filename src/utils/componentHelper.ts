
import { Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  guid,
  getDataType,
  isString,
  specCompNamesMap,
} from  '@/utils';

import {
  IComponentConfig,
  ConfigOrNull,
} from '@/utils/index.d';

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

export function handleDropEvent(e: DragEvent): ConfigOrNull {
  // 阻止冒泡
  e.stopPropagation();
  let el: any = e.srcElement || e.target;
  el.classList.remove('drag-over');
  let config: IComponentConfig;
  try {
    config = JSON.parse(e.dataTransfer!.getData('config')) || {};
  } catch(e) {
    console.error(e);
    return null;
  }
  return config;
}

export const configHanlder = function(config: ConfigOrNull, parentConfig: ConfigOrNull): ConfigOrNull {
  
  if (!config) return null;

  config.parent = parentConfig;
  config.id = guid();
  config.class = `${config.name}_${config.id}`;
  config.layout && (config.layout.i = config.id); // vue-grid-layout
  (config.attrs || (config.attrs = {}))['config-id'] = config.id;

  // 删除占位标志
  config.placeholder && delete config.placeholder;
  // 利用闭包--需要确定一下闭包是否泄漏
  let listener = {
    drop: (e: DragEvent) => {
      const childConfig = handleDropEvent(e);
      configHanlder(childConfig, config);
    }
  };
  // 处理原生html
  if (config.type && config.type === 'html') {
    config.on = listener;
  } else if (config.droppable) {
    config.nativeOn = listener;
  }

  // 处理g2组件,添加id
  if (config.name.indexOf('g2') > -1) {
    (config.props || (config.props = {})).id = guid();
  }

  // 处理嵌套样式
  if (parentConfig && parentConfig.droppable && parentConfig.class.indexOf('no-border') < 0) {
    parentConfig!.class += ' no-border';
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

// 递归查找删除
export const deleteCompByConfigId = (configs: IComponentConfig[], configId: string, parentConfig?: IComponentConfig) => {
  configs.some((config: IComponentConfig, index: number) => {
    if (config.id === configId) {
      configs.splice(index, 1);
      if (parentConfig && parentConfig.class!.indexOf('no-border') > 0) {
        parentConfig.class = parentConfig.class!.replace(/no\-border/, '')
      }
      return true;
    }
    if (config.children) {
      return deleteCompByConfigId(config.children, configId, config);
    }
    return false;
  })
}