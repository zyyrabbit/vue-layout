<template>
  <div class="leaf-code">
  
    <div ref="preview" id="preview"></div>

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { genTemplateStr, compileToFunction }  from '@/utils';
import {
  PageConfig
} from '@/utils/index.d';
import { Getter } from 'vuex-class';
import tempApi from '@/api/template';

@Component
export default class Preview extends Vue {

  @Getter('config/pageConfig')
  private pageConfig!: any;

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
