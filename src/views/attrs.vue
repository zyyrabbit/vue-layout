<template>
  <el-row type="flex" justify="center" class="leaf-attrs">
    <el-col :span="20">
      <el-form>
        <el-form-item :label="selectConfig.name"></el-form-item>
        <el-form-item 
          v-for="(value, name) in selectConfig.props" 
          :key="name" 
          :label="name">
          <el-input v-model="selectConfig.props[name]"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { objForEach }  from '@/utils/common.ts';

@Component
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
  }
</style>
