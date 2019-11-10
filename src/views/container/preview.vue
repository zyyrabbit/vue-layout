<template>
  <div class="leaf-code">
  
    <div ref="preview" id="preview"></div>

   <!--  <pre v-highlightjs="templateStr">
      <code class="html"></code>
    </pre>
     
    <pre v-highlightjs="jsStr">
      <code class="javascript"></code>
    </pre>

    <pre v-highlightjs="cssStr">
      <code class="css"></code>
    </pre> -->

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { genTemplateStr, compileToFunction }  from '@/utils';
import {
  PageConfig
} from '@/utils/index.d';
import tempApi from '@/api/template';

@Component
export default class Preview extends Vue {
  @Prop({ default: () => {} })
  private pageConfig!: PageConfig;

  mounted () {
    
    
    const vueCompile = require('vue-template-compiler');
    const templateStr = genTemplateStr(this.pageConfig);
    const compiled = vueCompile.compileToFunctions(templateStr);
    
    let _options = {};
    if (this.pageConfig.jsCode) {
      const genOptions = compileToFunction(this.pageConfig, templateStr);
      _options = genOptions();
    }
   
    let options: any = {
      el: this.$refs.preview,
      render: compiled.render,
      staticRenderFns: compiled.staticRenderFns,
      ..._options
    };

    new Vue(options);

   // window.open('http://localhost:3000/dist/index.html')
  }
}
</script>
<style lang="scss">
</style>
