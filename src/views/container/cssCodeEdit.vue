<template>
   <div class="leaf-css-code-dit">
      <el-input
        type="textarea"
        @blur="addUserStyle"
        :autosize="{ minRows: 15, maxRows: 100 }"
        placeholder=".leaf-designer{ ... }"
        v-model="value">
      </el-input>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

@Component
export default class cssCodeEdit extends Vue {
  @Prop()
  private value!: string;

  private addUserStyle() {
    if (!this.value) return;
    let style: any = document.getElementById('custom-layout');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-layout';
      style.setAttribute('scoped', '');
      style.type = 'text/css';
      let container = document.getElementById('leaf-container');
      container!.appendChild(style);
    }
    let cssText = document.createTextNode(this.value);
    style.innerHTML = '';
    style.appendChild(cssText);
  }
}
</script>
<style lang="scss">
.leaf-css-code-dit {
  background-color: #fff;
  border: none;
}
</style>
