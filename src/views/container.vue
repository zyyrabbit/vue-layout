<template>
  <el-row class="leaf-container">
    <el-col
      :span="19"
      @dragenter.native.stop="dragenter"
      @dragover.native.stop="dragOver"
      @dragleave.native.stop="dragleave"
      @drop.native.stop="drop"
      @click.native.stop="selectComponet"
      @contextmenu.native.stop="rightClick"
      class="leaf-container__left">
      <div class="leaf-container__left-tools">
        <el-button type="text" @click="action">预览代码</el-button>
      </div>
      <div v-if="showType === 'design'" class="leaf-container__left-content">
        <component-render
          v-for="config in configs"
          :key="config.id"
          :config="config"
          @focus.stop="selectComponet"> <!-- 用于处理el-select中，阻止click事件冒泡 -->
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
import ComponentRender from './componentRender.vue';
import CodeTree from './codeTree.vue';
import attrs from './attrs.vue';
import { 
  wrapHanlder, 
  breadthTraverse,
  deleteComp
} from '@/utils';

@Component({
  components: {
    ComponentRender,
    CodeTree,
    attrs
  }
})
export default class Container extends Vue {
  private configs: any[] = [];

  private showType: string = 'design';
  private selectConfig: any = {};

  private action() {
    this.showType = this.showType === 'design' ? 'code' : 'design';
  }

  private selectComponet(e: MouseEvent) {
    let configId = this.getSelectConfigId(e);
    if (!configId) return;
    this.selectConfig = breadthTraverse(this.configs, 'children', (item: any) => item.id === configId);
  }

  private rightClick(e: MouseEvent) {
    e.preventDefault();
    let configId = this.getSelectConfigId(e);
    if (!configId) return;
    deleteComp(this.configs, configId);
    if (configId === this.selectConfig.id) {
      this.selectConfig = {}
    }
  }

  private  dragenter(e: DragEvent) {
    e.toElement.classList.add('drag-over');
  }

  private  dragOver(e: DragEvent) {
    e.preventDefault();
  }

  private  dragleave(e: DragEvent) {
    e.toElement.classList.remove('drag-over');
  }

  // 松开拖放e是容器元素
  private drop(e: DragEvent) {
    let el: any = e.srcElement || e.target;
    el.classList.remove('drag-over');
    if (this.showType === 'code') return;
    let config = wrapHanlder(e);

    this.configs.push(config);
  }

  private getSelectConfigId(e: MouseEvent) {
    e.stopPropagation();
    let el: any = e.srcElement || e.target,
        configId = el.getAttribute('config-id');
    // 处理触发事件不是组件元素情况
    while(!configId && el.parentElement) {
      el = el.parentElement;
      configId = el.getAttribute('config-id');
    }
    return configId;
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
