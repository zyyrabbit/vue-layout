<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  getDataType, 
  attrConfig,
  objForEach,
  underlineToDump,
  capital,
  isNumber
} from '@/utils';

@Component({
  functional: true,
} as any)
export default class ComponentRender extends Vue {
  @Prop({default: () => {}})
  private config!: any;
  @Prop()
  private objKey!: string;

  render(h: typeof Vue.prototype.$createElement, context: any): VNode {
    let { props: { config, objKey}, data } = context,
      name = config.name,
      value = config.props[objKey];
    name = capital(underlineToDump(name));
    // 先匹配特殊属性
    if (attrConfig[name] && attrConfig[name][objKey]) {
      let { type, options } =  attrConfig[name][objKey];
      let children = options.map((option: any) => {
        return h('el-option', {
          props: {
            label: option,
            value: option
          }
        }, null);
      })
      return h(type, data, children);
    } 

    let dataType = getDataType(value);
    // 特殊处理--权宜之计
    if (isNumber(dataType)) {
      let input = data.on.input;
      data.on.input = function($$v: string) {
        input(Number($$v));
      }
    }
    return h(attrConfig.common[dataType], data, null);
  }
}
</script>
