<template>
  <el-row class="leaf-container" id="leaf-container">
    <el-col
      :span="19"
      @dragenter.native.stop="dragenter"
      @dragover.native.stop="dragOver"
      @dragleave.native.stop="dragleave"
      @drop.native.stop="drop"
      @click.native.stop="selectComponet"
      @contextmenu.native.stop="rightClick"
      class="leaf-container__left">
      <div class="leaf-container__tools">
        <a 
          v-for="item in tools"
          :class="{'leaf-container__tools--select': item.type === showType}"
          :key="item.type"
          :title="item.title"
          @click="action(item.type)">
          <svg-icon :name="item.type"></svg-icon>
        </a>
      </div>
      <div 
        v-if="showType === 'design' || showType === 'preview'"
        class="leaf-container__content"
        :class="{'leaf-container__content-preview': showType === 'preview'}">
        <component-render
          v-for="config in configs"
          :key="config.id"
          :config="config"
          @focus.stop="selectComponet"> <!-- 用于处理el-select中，阻止click事件冒泡 -->
        </component-render>
        <span v-if="configs.length === 0" class="leaf-container__content--intro">
          请拖拽组件进来...
        </span>
      </div>
      <code-tree 
        v-else-if="showType === 'code'"
        :css="css"
        :configs="configs" 
        class="leaf-container__code"></code-tree>
      <div v-else class="leaf-container__style">
        <el-input
          type="textarea"
          @blur="addUserStyle"
          :autosize="{ minRows: 15, maxRows: 100 }"
          placeholder=".leaf-designer{ ... }"
          v-model="css">
        </el-input>
      </div>
    </el-col>
    <el-col :span="5" class="leaf-container__right">
      <attrs :select-config="selectConfig"></attrs>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ComponentRender from '@/views/component/componentRender.vue';
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
  private selectConfig: any = null;
  private css: string = '';
  private tools: object[] = [
    {
      title: '页面设计',
      type: 'design'
    },
    {
      title: '预览页面',
      type: 'preview'
    },
    {
      title: '预览代码',
      type: 'code'
    },
    {
      title: '编辑样式',
      type: 'style'
    },
    {
      title: '全部删除',
      type: 'delete'
    }
  ]
  
  private action(showType: string) {
    this.showType = showType;
    if(showType === 'delete') {
      this.deleteAll();
    }
  }

  private deleteAll() {
    this.configs = [];
    this.selectConfig && (this.selectConfig = null);
    this.showType = 'design';
  }

  private addUserStyle() {
    if (!this.css) return;
    let style: any = document.getElementById('custom-layout');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-layout';
      style.setAttribute('scoped', '');
      style.type = 'text/css';
      let container = document.getElementById('leaf-container');
      container!.appendChild(style);
    }
    let cssText = document.createTextNode(this.css);
    style.innerHTML = '';
    style.appendChild(cssText);
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
    if (this.selectConfig && configId === this.selectConfig.id) {
      this.selectConfig = null;
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
    if (this.showType !== 'design') return;
    let config = wrapHanlder(e);
    config && this.configs.push(config);
  }

  private getSelectConfigId(e: MouseEvent) {
    e.stopPropagation();
    let el: any = e.srcElement || e.target,
        configId = el.getAttribute('config-id'),
        cellIndex = el.cellIndex; // 处理element-ui table 和 table-column-item特殊情况
    // 处理触发事件不是组件根元素情况
    let currentEle = el;
    while(!configId && currentEle.parentElement) {
      currentEle = currentEle.parentElement;
      configId = currentEle.getAttribute('config-id');
    }
    // 处理element-ui table 和 table-column-item特殊情况
    if (el.tagName === 'TH') {
      let ElTableHiddenColumns = currentEle.getElementsByClassName('hidden-columns')[0];
      ElTableHiddenColumns && (configId = ElTableHiddenColumns.children[cellIndex].getAttribute('config-id'));
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
      position: relative;
    }

    &__tools {
      height: 50px;
      background-color:#eee;
      border-bottom: 1px solid #ddd;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 3000;
      text-align: right;
      >a {
        display: inline-block;
        padding: 10px;
        height: 100%;
        svg {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          &:hover {
            fill: #409EFF;
          }
        }
        &::after {
          display: inline-block;
          content: '';
          height: 100%;
          width: 1px;
          vertical-align: middle;
        }
      }
      &--select {
         fill: #409EFF;
      }
    
    }

    &__content, &__code, &__style {
      height: 100%;
      overflow-y: auto;
    }

    &__content, &__style {
      padding-top: 50px;
    }

    &__content {
      &--intro {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 30px;
        font-weight: 400;
        color: #ccc;
      }
    }

    &__code {
      padding-top: 40px;
      background-color: #fafafa;
    }
  }
</style>
