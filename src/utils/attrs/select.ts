import { 
  index
 } from '@/utils/index.d';
 import { Vue } from 'vue-property-decorator';
 
export default function(h: typeof Vue.prototype.$createElement, config: index, data: any) {
  const { options } = config;
    const children = options.map((option: any) => {
      return h('el-option', {
        props: {
          label: option,
          value: option
        }
      }, null);
    });
    return h('el-select', data, children);
}