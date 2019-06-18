<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { renderHanlder } from '@/utils';

@Component({
  functional: true,
} as any)
export default class ComponentRender extends Vue {
  @Prop({default: () => {}})
  private config!: any;

  render(h: typeof Vue.prototype.$createElement, context: any): VNode {
    let { props, data, children } = context;
    let config = props.config;
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
    let configCopy =  _.cloneDeep(config);
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

    if (configCopy.nativeOn) {
      data.nativeOn = {
        ...data.nativeOn,
        ...configCopy.nativeOn
      }
    }

    if (configCopy.class) {
      data.class = configCopy.class.split(',');
    }

    // 用于处理el-select中，阻止click事件冒泡添加focus事件监听器，其他删除
    if (data.on && configCopy.name !== 'el-select') {
      delete data.on.focus
    }

    if (configCopy.on) {
      data.on = {
        ...data.on,
        ...configCopy.on
      }
    }
  
    if (configCopy.children) {
      children = renderHanlder(h, configCopy.children);
    }

    return h(config.name, data , children);
  }
}
</script>
