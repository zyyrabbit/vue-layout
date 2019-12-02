<template>
  <div class="leaf-code">

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
import { genTemplateStr, genJsStr, genCssStr }  from '@/utils';
import {
  PageConfig
} from '@/utils/index.d';
import { Getter } from 'vuex-class';

@Component
export default class Preview extends Vue {

  @Getter('config/pageConfig')
  private pageConfig!: any;

  get templateStr() {
    return genTemplateStr(this.pageConfig)
  }


  get jsStr() {
    return genJsStr(this.pageConfig)
  }

  get cssStr() {
    return genCssStr(this.pageConfig)
  }

}
</script>
<style lang="scss">
</style>
