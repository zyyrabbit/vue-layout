<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

@Component({
  functional: true,
  name: 'leaf-html',
  componentName: 'leaf-html',
} as any)
export default class LeafHtml extends Vue {
  @Prop( {default: 'div'} )
  private tag!: string;

  render(h: typeof Vue.prototype.$createElement, context: any): VNode {
    let { props, data, children } = context;
    let { text } = data.attrs;
    // 处理文本
    children = children ? [...children, text] : [text];

    return h(props.tag, data, children);
  }
}
</script>
