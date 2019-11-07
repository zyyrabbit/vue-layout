<template>
  <el-row type="flex" justify="center" class="leaf-attrs">
    <el-col :span="20">
      <h3 class="leaf-attrs--title">属性编辑</h3>
      <el-form v-if="selectConfig">
        <el-form-item>{{selectConfig.name}}</el-form-item>
        <!-- props -->
        <el-form-item>Props</el-form-item>
        <el-form-item v-for="key of filterProps" :key="key" :label="key">
          <attr-render 
            :config="selectConfig"
            :obj-key="key"
            @change="change($event, key)"
            type="props"
            v-model="selectConfig.props[key]">
          </attr-render>
        </el-form-item>
        <!-- 属性 -->
        <el-form-item>Attrs</el-form-item>
        <el-form-item v-for="key of filterAttrs" :key="key" :label="key">
          <attr-render
            :config="selectConfig" 
            :obj-key="key"
            type="attrs"
            v-model="selectConfig.attrs[key]">
          </attr-render>
        </el-form-item>
        <!-- class -->
        <el-form-item>Style</el-form-item>
        <el-form-item>
          <div>class</div>
          <el-input v-model="selectConfig.class"></el-input>
        </el-form-item>
        <el-form-item>
          <div>css</div>
          <style-layout :select-config="selectConfig"></style-layout>
        </el-form-item>
        <el-form-item v-if="selectConfig.action">
          <div>动作</div>
          <el-row>
            <el-col :span="12">
              <el-select v-model="action.name" placeholder="请选择动作">
                <el-option
                  v-for="item of selectConfig.action.names"
                  :key="item"
                  :label="item"
                  :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col  :span="12">
              <el-select v-model="action.method" @change="changeAction" placeholder="请选择触发函数">
                <el-option 
                  v-for="item of actionMethods"
                  :key="item"
                  :label="item"
                  :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AttrRender from './attrRender.vue';
import StyleLayout from './style/layout.vue'
import { 
  objForEach,
  filterAttrs,
  filterProps,
  
} from '@/utils';

import {
  index
} from '@/utils/index.d';

@Component({
  components: {
    AttrRender,
    StyleLayout
  }
})
export default class Attrs extends Vue {
  @Prop({ default: () => {} })
  private selectConfig!: any;
  // 暂时模拟
  private action: any = {};
  private actionMethods: any = ['change', 'blur'];
  private changeAction() {
    this.selectConfig.action.map[this.action.name] = this.action.method;
  }

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
  }
</style>
