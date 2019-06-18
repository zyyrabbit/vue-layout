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
import { genCode }  from '@/utils';
import pretty from 'pretty';

@Component
export default class CodeTree extends Vue {
  @Prop({ default: () => [] })
  private configs!: any;
  @Prop({ default: '' })
  private css!: string;

  get templateStr() {
    let templateStr = `<template><div class="template">${genCode(this.configs)}</div></template>`;
    // 简单处理删除一些代码
    templateStr = templateStr.replace(/:?[\w-]+=(""|"0")/g, '');
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
        }
      <\/script>`;
    return pretty(jsStr);
  }

  get cssStr() {
    let cssStr = `<style>${this.css}</style>`;
    return pretty(cssStr);
  }

  private dealTemplateVar() {
    let patt = /:(\w+)="([^"]*)"/g,
        ret,
        result = [];
    while((ret = patt.exec(this.templateStr)) != null) {
      if (/false|true|[0-9]+/.test(ret[2])) continue;
      result.push(ret[1]);   
    }
    return result.map((key: string) => {
      return `private ${key};`;
    }).join('');
  }
}
</script>
<style lang="scss">
</style>
