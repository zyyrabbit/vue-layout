<template>
  <div class="leaf-code">
    <el-button @click="save" :loading="loading.save">保存</el-button>
    <el-button @click="preview">预览页面</el-button>

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
import { genTemplateCode, genStyleCode }  from '@/utils';
import pretty from 'pretty';
import tempApi from '@/api/template';

@Component
export default class CodeTree extends Vue {
  @Prop({ default: () => {} })
  private pageConfig!: any;

  private loading: any = {
    save: false
  }

  get templateStr() {
    let templateStr = `<template><div class="template">${genTemplateCode(this.pageConfig.configs)}</div></template>`;
    // 简单处理删除一些代码
    templateStr = templateStr.replace(/:?[\w-_]+=(""|"0")/g, '');
    templateStr = templateStr.replace(/:(\w+)="([^"]*)"/g, (match, $1, $2) => {
      if (/false|true|[0-9]+/.test($2)) {
        return `:${$1}="${$2}"`;
      }
      return `:${$1}="${$1}"`;
    });
    return pretty(templateStr);
  }

  get jsStr() {
    let jsStr = `
      <script lang="ts">
        import { Component, Vue, Prop } from 'vue-property-decorator';
        @Component
        export default class Leaf extends Vue {
          ${this.dealTemplateVar()}

          ${this.pageConfig.jsCode}
        }
      <\/script>`;
    return pretty(jsStr);
  }

  get cssStr() {
    let cssStr = `<style>
      ${this.pageConfig.cssCode}
      ${genStyleCode(this.pageConfig.configs) || ''}
    </style>`;
    return pretty(cssStr);
  }

  private dealTemplateVar() {
    let pattern = /:(\w+)="([^"]*)"/g,
        ret,
        result = [];
    while((ret = pattern.exec(this.templateStr)) != null) {
      if (/false|true|[0-9]+/.test(ret[2])) continue;
      result.push(ret[1]);   
    }
    return result.map((key: string) => {
      return `private ${key}: any;`;
    }).join('');
  }

  preview () {
    window.open('http://localhost:3000/dist/index.html')
  }

  private async save() {
   this.loading.save = true;
   const vueSFCTemp = 
    `${this.templateStr}
    ${this.jsStr}
    ${this.cssStr}`
    try {
      await tempApi.preview({
        vueSFCTemp
      })
      this.$message.success('保存页面成功')
    } finally {
      this.loading.save = false;
    }
  }
}
</script>
<style lang="scss">
</style>
