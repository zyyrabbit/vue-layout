<template>
  <div ref="monaco" id="monaco"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

@Component
export default class codeEdit extends Vue {
  @Prop({default: ''}) 
  private value!: string;

  @Prop({default: ''}) 
  private language!: string;

  private defaultValue: string = '';

  private monacoInstance: any;

  mounted() {
    debugger
    const value = this.value || this.defaultValue;
    
    this.$emit('input', value);

    this.monacoInstance = monaco.editor.create(this.$refs.monaco as any, {
      value,
      language: this.language,
      minimap: {
        enabled: false
      }
    });

    this.monacoInstance.onDidBlurEditorText(() => {
      const newValue = this.monacoInstance.getValue();
      this.$emit('input', newValue)
    })
    
  }

  beforeDestory() {
    this.monacoInstance.dispose(); // 使用完成销毁实例
  }
}
</script>
<style lang="scss">
#monaco {
  padding: 10px;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
</style>
