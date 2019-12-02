import { 
  index
 } from '@/utils/index.d';
import { Vue } from 'vue-property-decorator';

export default function(h: typeof Vue.prototype.$createElement, config: index, data: any) {
  const { min, max } = config;
  const props = data.props || {};
  props.min = min;
  props.max = max;

  data.props = props;
  return h('el-slider', data, null);
}