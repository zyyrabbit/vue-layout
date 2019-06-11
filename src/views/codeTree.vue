<template>
  <code class="leaf-code">
    <pre v-highlightjs="templateStr">
      <code class="html"></code>
    </pre>
  </code>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { objForEach }  from '@/utils/common.ts';
import pretty from 'pretty';

@Component
export default class CodeTree extends Vue {
  @Prop({default: () => []})
  private configs!: any;

  get templateStr() {
    let content = '<template>';
    this.configs.forEach((config: any) => {
        let { name, attrs, props } = config;
        let attrsStr = attrs ? this.genPropsOrAttrsStr(attrs, 'attrs') : '';
        let propsStr = props ?  this.genPropsOrAttrsStr(props, 'props') : '';
        content += `<${name} ${propsStr} ${attrsStr}></${name}>`
    });
    content += '\n</template>';
    return pretty(content);
  }

  private genPropsOrAttrsStr(obj: any, type: 'attrs' | 'props') {
    let str = '';
    objForEach(obj, (key, value) => {
      if (type === 'attrs') {
        str += `${key}="${value}"`
      } else {
        str += `:${key}="${value}"`
      }
    })
    return str;
  }
}
</script>
<style lang="scss">
</style>
