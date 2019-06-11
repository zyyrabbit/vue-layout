<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

@Component({
  functional: true,
} as any)
export default class ComponentRender extends Vue {
  @Prop({default: () => {}})
  private config!: any;

  render(h: typeof Vue.prototype.$createElement, context: any): VNode {
    let { props, data, children } = context;
    let config = props.config;

    // 深度复制
    let configCopy = JSON.parse(JSON.stringify(config));
    
    // todo --- 抽取函数出来
    if (configCopy.props) {
      data.props = configCopy.props;
    }

    if (configCopy.attrs) {
      data.attrs = {
        ...data.attrs,
        ...configCopy.attrs
      }
    }

    return h(config.name, data , children);
  }
}
</script>
