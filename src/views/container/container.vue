<template>
  <el-row class="leaf-container" id="leaf-container">
    <el-col
      :span="19"
      ref="container"
      @dragenter.native.stop="dragenter"
      @dragover.native.stop="dragOver"
      @dragleave.native.stop="dragleave"
      @drop.native.stop="drop"
      @click.native.stop="selectComponet"
      @contextmenu.native.stop="onOpenMenu($event)"
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
        <grid-layout
          :layout.sync="layout"
          :col-num="24"
          :row-height="30"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :margin="[10, 10]"
          :use-css-transforms="true">
          <grid-item 
            v-for="config in configs"
            :static="showType === 'preview'"
            :x="config.layout.x"
            :y="config.layout.y"
            :w="config.layout.w"
            :h="config.layout.h"
            :i="config.layout.i"
            :key="config.layout.i">
            <component-render
              :key="config.id"
              :config="config"
              @focus.stop="selectComponet"> <!-- 用于处理el-select中，阻止click事件冒泡 -->
            </component-render>
          </grid-item>
        </grid-layout>
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
     <ul v-show="menuVisible" :style="styles" class="context-menu">
      <li @click="deleteComp">删除</li>
      <li>复制</li>
    </ul>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import VueGridLayout from 'vue-grid-layout';
import ComponentRender from '@/views/component/componentRender.vue';
import CodeTree from './codeTree.vue';
import attrs from './attrs.vue';
import { 
  wrapHanlder, 
  breadthTraverse,
  deleteComp,
  guid,
  configs
} from '@/utils';

@Component({
  components: {
    ComponentRender,
    CodeTree,
    attrs,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class Container extends Vue {
  private configs: any[] = [];

  private showType: string = 'design';
  private selectConfig: any = null;
  private css: string = '';
  private menuVisible: boolean = false;
  private styles: any = {
    top: 0,
    left: 0
  };
  private contextMenuSelectId: any = null;
  private layout: any[] = [];
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

  @Watch('menuVisible')
  onmenuVisibleChange(value: boolean) {
    if (value) {
      this.$refs.container.$el.addEventListener('click', this.onCloseMenu);
    } else {
      this.$refs.container.$el.removeEventListener('click', this.onCloseMenu);
    }
  }
  
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
    let config: any = wrapHanlder(e);

    if (config) {
      this.configs.push(config);
      this.layout.push(config.layout)
    }
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

  public onOpenMenu(e: MouseEvent) {
    e.preventDefault();
    this.contextMenuSelectId = this.getSelectConfigId(e);
    if (!this.contextMenuSelectId) return;
    const menuMinWidth = 105;
    const {
      left,
      width
    } = this.$el.getBoundingClientRect()
    const maxLeft = width - menuMinWidth; 
    const _left = e.clientX - left + 15;
    this.$set(this.styles, 'left', (_left > maxLeft ? maxLeft : _left) + 'px')
    this.$set(this.styles, 'top', e.clientY - 50 + 'px')
    this.menuVisible = true;
  }


  public onCloseMenu() {
    this.menuVisible = false;
  }

  private deleteComp() {
    deleteComp(this.configs, this.contextMenuSelectId);
    if (this.selectConfig && this.contextMenuSelectId === this.selectConfig.id) {
      this.selectConfig = null;
    }
    this.onCloseMenu();
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

  .context-menu {
    position: absolute;
    z-index: 10010;
    font-size: 12px;
    background-color: $leaf-primary-color-white;
    border-radius: $leaf-border-radius;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 15px 40px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
      &:not(:last-child) {
        border-bottom: 1px dotted #aaa;
      }
    }
  }
</style>
