<template>
  <el-row class="leaf-container" id="leaf-container">
    <el-col
      :span="19"
       ref="container"
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
      <div class="leaf-container__main">
          
        <div
          v-if = "showType === 'design'"
          @dragenter.stop="dragenter"
          @dragover.stop="dragOver"
          @dragleave.stop="dragleave"
          @drop.stop="drop"
          @click.stop="selectComponet"
          @contextmenu.stop="onOpenMenu($event)"
          class="leaf-container__content">
        <!--  <grid-layout
            :layout.sync="layout"
            :col-num="24"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[0, 0]"
            :use-css-transforms="true">
            <grid-item 
              v-for="config in pageConfig.configs"
              :static="showType === 'preview'"
              :x="config.layout.x"
              :y="config.layout.y"
              :w="config.layout.w"
              :h="config.layout.h"
              :i="config.layout.i"
              :key="config.layout.i"> -->
              <component-render
                v-for="config in pageConfig.configs"
                :key="config.id"
                :config="config"
                @focus.stop="selectComponet"> <!-- 用于处理el-select中，阻止click事件冒泡 -->
              </component-render>
          <!--  </grid-item>
          </grid-layout>  -->
          <span 
            v-show="pageConfig.configs.length === 0" 
            class="leaf-container__content--intro">
            请拖拽组件进来...
          </span>
        </div>

        <!-- js代码编辑 -->
        <code-edit 
          v-else-if="showType === 'js-edit'" 
          key="js-edit" 
          language="javascript"  
          v-model="pageConfig.jsCode"></code-edit>

        <!-- css代码编辑 -->
        <code-edit 
          v-else-if="showType === 'css-edit'" 
          key="css-edit" 
          language="css"  
          v-model="pageConfig.cssCode"></code-edit>

        <!-- 预览页面 -->
        <preview 
          v-else-if="showType === 'preview'" 
          class="leaf-container__main-code"></preview>

        <!-- 预览页面代码 -->
        <preview-code v-else></preview-code>
     
      </div>
    </el-col>

    <el-col :span="5" class="leaf-container__right">
      <attrs></attrs>
    </el-col>
    <ul v-show="menuVisible" :style="styles" class="context-menu">
      <li @click="deleteComp">删除</li>
      <li>复制</li>
    </ul>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ComponentRender from '@/views/component/componentRender.vue';
import Preview from './preview.vue';
import PreviewCode from './preview-code.vue';
import attrs from './attr/index.vue';
import codeEdit from './code/codeEdit.vue';

import { Getter } from 'vuex-class';

import { 
  configHanlder, 
  breadthTraverse,
  guid,
  handleDropEvent
} from '@/utils';

import { 
  IComponentConfig,
  ConfigOrNull,
} from '@/utils/index.d';


const VueGridLayout = require('vue-grid-layout');

@Component({
  components: {
    ComponentRender,
    Preview,
    attrs,
    codeEdit,
    PreviewCode,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class Container extends Vue {

  @Getter('config/selectConfig')
  private selectConfig!: IComponentConfig;
  @Getter('config/pageConfig')
  private pageConfig!: any;

  private showType: string = 'design';
  private prevSelectEl: any = null;

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
      title: '预览页面代码',
      type: 'code'
    },
    {
      title: '编辑样式',
      type: 'css-edit'
    },
    {
      title: '编辑js',
      type: 'js-edit'
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
    if (showType === 'delete') {
      this.deleteAll();
    }
  }

  private deleteAll() {
    this.$store.dispatch('config/clearAll');
    this.$store.dispatch('config/setSelectConfig', null);
    this.showType = 'design';
  }

  private selectComponet(e: MouseEvent) {
    
    let { configId, currentEle } = this.getSelectConfigId(e);
    // 处理边框样式
    if (this.prevSelectEl) {
      this.prevSelectEl.style.border = '';
    }

    if (!configId) return;
    currentEle.style!.border = '1px solid #fccfb9';

    const selectConfig = breadthTraverse(this.pageConfig.configs, 'children', (item: any) => item.id === configId);
    
    this.$store.dispatch('config/setSelectConfig', selectConfig)
    
    this.prevSelectEl = currentEle;
  }

  private dragenter(e: any) {
    e.toElement.classList.add('drag-over');
  }

  private dragOver(e: DragEvent) {
    e.preventDefault();
  }

  private dragleave(e: any) {
    e.toElement.classList.remove('drag-over');
  }

  // 松开拖放e是容器元素
  private drop(e: DragEvent) {
    let config: ConfigOrNull = handleDropEvent(e);
    if (!config) return;
    configHanlder(config, null);
    if (config) {
      this.$store.dispatch('config/addConfig', config);
      this.layout.push(config.layout);
    }
  }

  private getSelectConfigId(e: MouseEvent) {
    e.stopPropagation();
    let el: any = e.srcElement || e.target,
        configId = el.getAttribute('config-id'),
        cellIndex = el.cellIndex; // 处理element-ui table 和 table-column-item 特殊情况
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
    return {
      configId,
      currentEle,
    }
  }

  public onOpenMenu(e: MouseEvent) {
    e.preventDefault();
    let { configId } = this.getSelectConfigId(e);
    this.contextMenuSelectId = configId;
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
    this.$store.dispatch('config/deleteById', this.contextMenuSelectId);
    if (this.selectConfig && this.contextMenuSelectId === this.selectConfig.id) {
      this.$store.dispatch('config/setSelectConfig', null);
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

    &__main, &__main-code {
      height: 100%;
      overflow-y: auto;
    }

    &__main-code {
      background-color: #fafafa;
    }

    &__main {
      padding-top: 50px;
    }

    &__content {
      width: 100%;
      height: 100%;
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
