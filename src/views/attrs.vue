<template>
  <el-row type="flex" justify="center" class="leaf-attrs">
    <el-col :span="20">
      <h3 class="leaf-attrs--title">属性编辑</h3>
      <el-form v-if="selectConfig">
        <!-- props -->
        <el-form-item>Props</el-form-item>
        <el-form-item 
          v-for="(value, key) in selectConfig.props" 
          :key="key" 
          :label="key">
           <attr-render 
            :config="selectConfig"
            :obj-key="key"
            type="props"
            v-model="selectConfig.props[key]"></attr-render>
        </el-form-item>
        <!-- 属性 -->
        <el-form-item>Attrs</el-form-item>
        <!-- 暂时没找到好办法，只能 v-if 和 v-for -->
        <el-form-item 
          v-for="(value, key) in selectConfig.attrs"
          v-if="key !== 'config-id'"
          :key="key" 
          :label="key">
           <attr-render
            :config="selectConfig" 
            :obj-key="key"
            type="attrs"
            v-model="selectConfig.attrs[key]"></attr-render>
        </el-form-item>
        <!-- class -->
        <el-form-item>Style</el-form-item>
        <el-form-item>
          <div>class</div>
          <el-input v-model="selectConfig.class"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Element from 'element-ui';
import { objForEach } from  '@/utils';
import AttrRender from './attrRender.vue';

@Component({
  components: {
    AttrRender
  }
})
export default class Attrs extends Vue {
  @Prop({ default: () => {} })
  private selectConfig!: any;

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
