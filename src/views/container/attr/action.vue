<template>
  <div class="leaf-action-setting">
    <el-row>
      <el-col :span="12">
        <el-select v-model="action.name" placeholder="请选择动作">
          <el-option
            v-for="item of selectConfig.action.names"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select v-model="action.method" @change="changeAction" placeholder="请选择触发函数">
          <el-option v-for="item of actionMethods" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode } from "vue";

@Component
export default class Action extends Vue {
  @Prop({ default: () => {} })
  private selectConfig!: any;

  // 暂时模拟
  private action: any = {};
  private actionMethods: any = ['change', 'blur'];
  private changeAction() {
    this.selectConfig.action.map[this.action.name] = this.action.method;
  }
}
</script>
<style lang="scss" scoped>
</style>