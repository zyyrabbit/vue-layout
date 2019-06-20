<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { 
  renderHanlder,
  deepCopy,
  mergeStrategy 
} from '@/utils';

@Component({
  functional: true,
} as any)
export default class ComponentRender extends Vue {
  @Prop({default: () => {}})
  private config!: any;

  render(h: typeof Vue.prototype.$createElement, context: any): VNode {
    let { props: { config }, data, children } = context;
    // 如果有占位标志，则生成占位元素
    if (config.placeholder) {
       return h(config.placeholder, {
         on: {
           ...data.nativeOn
         },
         attrs: {
           draggable: 'true'
         },
         'class': {
            'leaf-placeholder': true
          }
       } , null);
    }
    // 深度复制
    let configCopy =  deepCopy(config);
    mergeStrategy(data, configCopy);
    if (configCopy.children) {
      children = renderHanlder(h, configCopy.children);
    }

    return h(config.name, data , children);
  }
}
</script>
