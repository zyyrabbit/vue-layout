<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  getDataType, 
  attrConfig,
  objForEach,
  underlineToCapitalDump,
  isNumber,
  handlerAttrs
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
    let { props: { config, objKey }, data } = context,
      name = config.name, // 组件名称
      type = data.attrs.type || 'props', // props or attrs
      value = config[type][objKey]; // 属性值
 
    name = underlineToCapitalDump(name); // 驼峰以及首字母大写

    const specConfig = attrConfig[name] && attrConfig[name][objKey];
    
    // 先匹配特殊属性
    if (specConfig) {
      return handlerAttrs(h, specConfig, data);
    }

    // 以下为普通类型
    const dataType = getDataType(value);
    // 特殊处理prop为number类型
    if (isNumber(dataType)) {
      const input = data.on.input;
      data.on.input = function($$v: string) {
        input(Number($$v));
      }
    }
    return h(attrConfig.common[dataType], data, null);
  }
}
</script>
