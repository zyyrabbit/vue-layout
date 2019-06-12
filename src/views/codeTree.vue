<template>
  <code class="leaf-code">
    <pre v-highlightjs="templateStr">
      <code class="html"></code>
    </pre>
  </code>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { recursiveTraverse }  from '@/utils';
import pretty from 'pretty';

@Component
export default class CodeTree extends Vue {
  @Prop({default: () => []})
  private configs!: any;

  get templateStr() {
    let templateStr = '<template><div class="template">';
    templateStr += recursiveTraverse(this.configs);
    templateStr += '</div></template>';
    return pretty(templateStr);
  }
}
</script>
<style lang="scss">
</style>
