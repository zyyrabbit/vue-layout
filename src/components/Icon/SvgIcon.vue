<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
@Component({
  functional: true,
} as any)
export default class SvgIcon extends Vue {
  @Prop({default: ''})
  private name!: string;

  render(h: typeof Vue.prototype.$createElement, context: any): VNode {
    let { props, data } = context;
    let iconName = `#${props.name}`;
    let classNames = ['svg-icon'];
    data.staticClass && classNames.push(data.staticClass);
    return h(
      'svg',
      {
        class: classNames,
        attrs: {
          height: '16px',
          width: '16px'
        }
      },
      [
        h('use', {
          attrs: {
            'xlink:href': iconName
          },
        }),
      ],
    );
  }
}
</script>
<style lang="scss">
  .svg-icon {
    max-height: 100%;
    display: inline-block;
    font-size: 0;
  }
</style>
