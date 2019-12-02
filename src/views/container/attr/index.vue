<template>
  <el-row type="flex" justify="center" class="leaf-attrs">

    <el-col v-if="selectConfig" :span="20">
      
      <h3 class="leaf-attrs--title">{{selectConfig.name}}</h3>

      <el-form>
        <el-form-item>属性编辑</el-form-item>
        <!-- props -->
        <el-form-item v-for="key of filterProps" :key="key">
          <div>{{key}}</div>
          <attr-render 
            :config="selectConfig"
            :obj-key="key"
            @change="change($event, key)"
            type="props"
            v-model="selectConfig.props[key]">
          </attr-render>
        </el-form-item>
        <!-- 属性 -->
        <el-form-item v-for="key of filterAttrs" :key="key">
          <div>{{key}}</div>
          <attr-render
            :config="selectConfig" 
            :obj-key="key"
            type="attrs"
            v-model="selectConfig.attrs[key]">
          </attr-render>
        </el-form-item>
      </el-form>

      <el-form>
        <el-form-item>样式编辑</el-form-item>
        <!-- class -->
        <el-form-item>
          <div>自定义类名</div>
          <el-input v-model="selectConfig.class"></el-input>
        </el-form-item>
        <el-form-item>
          <div>布局</div>
          <style-layout :select-config="selectConfig"></style-layout>
        </el-form-item>
      </el-form>

      <el-form>
        <el-form-item v-if="selectConfig.action">
          <div>动作</div>
          <action :select-config="selectConfig">></action>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col v-else :span="24" class="leaf-attrs--no-select">未选中组件</el-col>

  </el-row>
  
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AttrRender from './attrRender.vue';
import StyleLayout from './style/layout.vue';
import Action from './action.vue';
import { Getter } from 'vuex-class';
import { 
  objForEach,
  filterAttrs,
  filterProps,
} from '@/utils';

import {
  index,
  IComponentConfig,
} from '@/utils/index.d';

@Component({
  components: {
    AttrRender,
    StyleLayout,
    Action
  }
})
export default class Attrs extends Vue {
  @Getter('config/selectConfig')
  private selectConfig!: IComponentConfig;

  // props
  get filterProps() {
    let props: string[] = [];
    objForEach(this.selectConfig.props, key => {
      if (!filterProps[key]) {
        props.push(key);
      }
    })
    return props;
  }
  // 属性
  get filterAttrs() {
    let attrs: string[] = [];
    objForEach(this.selectConfig.attrs, key => {
      if (!filterAttrs[key]) {
        attrs.push(key);
      }
    })
    return attrs;
  }
  // 处理prop
  private change(val: string, key: string) {
    if (isNaN(Number(val))) {
      this.selectConfig.props[key] = 0;
    }
  }

}
</script>
<style lang="scss">
  .leaf-attrs {
    border-left: 1px solid #ccc;
    height: 100%;
    background-color: #eee;
    overflow-y: auto;
    &--title {
      padding: 20px 0;
    }
    &--no-select {
      text-align: center;
      padding-top: 200px;
    }
  }
</style>
