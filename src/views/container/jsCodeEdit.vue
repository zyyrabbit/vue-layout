<template>
  <div ref="monaco" id="monaco"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

@Component
export default class JsCodeEdit extends Vue {
  @Prop({default: ''}) 
  private value!: string;

  private defaultValue: string = `
    data() {
      return {
        value: ''
      }
    },

    created() {

    },

    mounted() {

    },

    methods: {
      change(val) {
        console.log(val)
      }
    }`

  mounted() {
   
    const monacoInstance = monaco.editor.create(this.$refs.monaco as any, {
      value: this.value || this.defaultValue,
      language: 'javascript',
      minimap: {
        enabled: false
      }
    });

    monacoInstance.onDidBlurEditorText(() => {
      const newValue = monacoInstance.getValue();
      this.$emit('input', newValue)
    })
    // monacoInstance.dispose();//使用完成销毁实例
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
