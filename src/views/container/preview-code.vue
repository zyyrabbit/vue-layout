<template>
  <div class="preview-code">

    <pre v-highlightjs="templateStr">
      <code class="html"></code>
    </pre>
     
    <pre v-highlightjs="jsStr">
      <code class="javascript"></code>
    </pre>

    <pre v-highlightjs="cssStr">
      <code class="css"></code>
    </pre>

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { genTemplateStr, genJsStr, genCssStr, dealTemplateVar }  from '@/utils';
import {
  PageConfig
} from '@/utils/index.d';
import { Getter } from 'vuex-class';
const pretty = require('pretty');

@Component
export default class Preview extends Vue {

  @Getter('config/pageConfig')
  private pageConfig!: PageConfig;

  get templateStr() {

    const templateStr = pretty(`
      <template>
        ${genTemplateStr(this.pageConfig)}
      </template>`, { 
        html: {
          wrap_attributes: 'force-expand-multiline'
        } 
      });
     
      return templateStr
  }


  get jsStr() {
    return pretty(`
      <script>
        export default {
          ${genJsStr(this.pageConfig)}
        }
      <\/script>`);
  }

  get cssStr() {
    return pretty(`
      <style>
        ${genCssStr(this.pageConfig)}
      </style>`);
  }

}
</script>
<style lang="scss">
.preview-code {
  padding-left: 20px;
  height: 100%;
  .hljs {
    background-color: #fff !important;
  }
}
</style>
