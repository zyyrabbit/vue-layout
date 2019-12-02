<template>
  <div class="leaf-style-layout">
    <el-form>
      <el-form-item v-for="attr in styleAttrs" :key="attr">
        <el-button @click="styleLayout(attr)">{{attr}}</el-button>
        {{selectConfig.style[attr]}}
      </el-form-item>
    </el-form>
    <!-- <div>
      <div class="leaf-style-margin">
        <div class="leaf-style-margin__item leaf-style-margin__item--top">margin-top</div>
        <div class="leaf-style-margin__item leaf-style-margin__item--right">margin-right</div>
        <div class="leaf-style-margin__item leaf-style-margin__item--bottom">margin-bottom</div>
        <div class="leaf-style-margin__item leaf-style-margin__item--left">margin-left</div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import { Getter } from 'vuex-class';
import {
  index,
  IComponentConfig,
} from '@/utils/index.d';

@Component
export default class StyleLayout extends Vue {
  @Getter('config/selectConfig')
  private selectConfig!: IComponentConfig;

  get styleAttrs() {
    return Object.keys(this.selectConfig.style)
  }

  private styleLayout(attr: string) {
    let { style } = this.selectConfig;
    let attrVal = style[attr] ? parseInt(style[attr]) : 0;
    style[attr] = `${(++attrVal)}px`;
  }
}
</script>
<style lang="scss" scoped>
.leaf-style-margin {
  position: relative;

  &__item {
    position: absolute;
  }
}
</style>