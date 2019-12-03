<template>

  <div class="leaf-code" id="leaf-code">
    <div ref="preview" id="preview"></div>
  </div>

</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { genTemplateStr, compileToFunction, genCssStr }  from '@/utils';
import {
  PageConfig
} from '@/utils/index.d';
import { Getter } from 'vuex-class';
import tempApi from '@/api/template';
const vueCompile = require('vue-template-compiler');

@Component
export default class Preview extends Vue {

  @Getter('config/pageConfig')
  private pageConfig!: PageConfig;

  mounted () {
    
    // 加载样式
    this.addUserStyle();
    const templateStr = genTemplateStr(this.pageConfig);
    const compiled = vueCompile.compileToFunctions(templateStr);
    
    let _options = {};
    if (this.pageConfig.jsCode) {
      const genOptions = compileToFunction(this.pageConfig, templateStr);
      _options = genOptions();
      debugger
    }
   
    const options: any = {
      el: this.$refs.preview,
      render: compiled.render,
      staticRenderFns: compiled.staticRenderFns,
      ..._options
    };

    new Vue(options);
  
  }

  private addUserStyle() {
    const cssCode = genCssStr(this.pageConfig)

    if (!cssCode) return;
    let style: any = document.getElementById('custom-layout');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-layout';
      style.setAttribute('scoped', '');
      style.type = 'text/css';
      const container = document.getElementById('leaf-code');
      container!.appendChild(style);
    }
    
    const cssText = document.createTextNode(cssCode);
    style.innerHTML = '';
    style.appendChild(cssText);

  }
}
</script>
<style lang="scss">
</style>
