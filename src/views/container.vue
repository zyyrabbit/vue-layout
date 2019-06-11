<template>
  <el-row class="leaf-container">
    <el-col
      :span="20"
      @dragover.native="dragOver"
      @drop.native="drop"
      class="leaf-container__left">
      <div class="leaf-container__left-tools">
        <el-button type="text" @click="action">预览代码</el-button>
      </div>
      <div v-if="showType === 'design'">
        <component-render
          v-for="config in configs"
          :key="config.id"
          :config="config"
          @click.native="selectComponet($event, config)"
        ></component-render>
      </div>
      <div v-if="showType === 'code'">
        <code-tree :configs="configs"></code-tree>
      </div>
    </el-col>
    <el-col :span="4" class="leaf-container__right">
      <attrs :select-config="selectConfig"></attrs>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import guid from '@/utils/guid.ts';
import ComponentRender from './render.vue';
import CodeTree from './codeTree.vue';
import attrs from './attrs.vue';

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

  private selectComponet($event: any, config: any) {
    this.selectConfig = config;
  }

  private dragOver(e: MouseEvent) {
    e.preventDefault();
  }

  // 松开拖放e是容器元素
  private drop(e: any) {
    if (this.showType === 'code') return;

    let config = JSON.parse(e.dataTransfer.getData('config')) || {};
    config.id = guid();
    
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
      padding: 20px;
    }
  }
</style>
