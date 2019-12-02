import { 
 IComponentConfig
} from '@/utils/index.d';
import { Vue } from 'vue-property-decorator';

import select from './select';
import slider from './slider';

const funMap: {[index: string]: Function} = {
  'el-select': select,
  'el-slider': slider
}

export function handlerAttrs(h: typeof Vue.prototype.$createElement, config: IComponentConfig, data: any) {
  const { type } = config;
  const fun = funMap[type as string];
  return fun(h, config, data);
}