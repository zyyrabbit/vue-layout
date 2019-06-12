<template>
  <el-row class="leaf-container">
    <el-col
      :span="19"
      @dragover.native="dragOver"
      @drop.native="drop"
      @click.native="selectComponet"
      class="leaf-container__left">
      <div class="leaf-container__left-tools">
        <el-button type="text" @click="action">预览代码</el-button>
      </div>
      <div v-if="showType === 'design'" class="leaf-container__left-content">
        <component-render
          v-for="config in configs"
          :key="config.id"
          :config="config">
        </component-render>
      </div>
      <div v-if="showType === 'code'">
        <code-tree :configs="configs"></code-tree>
      </div>
    </el-col>
    <el-col :span="5" class="leaf-container__right">
      <attrs :select-config="selectConfig"></attrs>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ComponentRender from './render.vue';
import CodeTree from './codeTree.vue';
import attrs from './attrs.vue';
import { wrapHanlder, breadthTraverse } from '@/utils';

@Component({
  components: {
    ComponentRender,
    CodeTree,
    attrs
  }
})
export default class Container extends Vue {
  private configs = [];

  private showType: string = 'design';
  private selectConfig: any = {};

  private action() {
    this.showType = this.showType === 'design' ? 'code' : 'design';
  }

  private selectComponet(e: MouseEvent) {
    e.stopPropagation();
    let el: any = e.srcElement || e.target,
        configId = el.getAttribute('config-id');
    // 处理触发事件不是组件元素情况
    while(!configId && el.parentElement) {
      el = el.parentElement;
      configId = el.getAttribute('config-id');
    }
    if (configId) {
      this.selectConfig = breadthTraverse(this.configs, 'children', (item: any) => item.id === configId);
    }
  }


  private dragOver(e: MouseEvent) {
    e.preventDefault();
  }

  // 松开拖放e是容器元素
  private drop(e: DragEvent) {
    if (this.showType === 'code') return;
    let config = wrapHanlder(e);
    
    this.configs.push(config);
  }
  
}
</script>
<style lang="scss">
  .leaf-container {
    height: 100%;
    &__left, &__right {
      height: 100%;
    }

    &__left-tools {
      padding: 10px;
      background-color:#eee;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
