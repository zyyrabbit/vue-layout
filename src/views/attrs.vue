<template>
  <el-row type="flex" justify="center" class="leaf-attrs">
    <el-col :span="20">
      <el-form>
        <el-form-item :label="selectConfig.name"></el-form-item>
        <el-form-item 
          v-for="(value, key) in selectConfig.props" 
          :key="key" 
          :label="key">
           <attr-render 
            :config="selectConfig" 
            :obj-key="key"
            v-model="selectConfig.props[key]"></attr-render>
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
    padding: 20px 0;
    border-left: 1px solid #ccc;
    height: 100%;
    background-color: #eee;
    overflow-y: auto;
  }
</style>
