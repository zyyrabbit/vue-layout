<template>
  <div class="header-wrapper" :style="{ 'background-color': theme }">
    <div class="header-wrapper__left" :style="{ 'background-color': theme }">
      <div class="header-wrapper__left--brand-img"></div>
      <div class="header-wrapper__left--brand-text">
        Leaf-Design
      </div>
    </div>
    <div class="header-wrapper__right" :style="{ 'background-color': theme }">
      <div class="item-group">
        <div class="item" title="用户名称">
          <span class="el-dropdown-link">github</span>
        </div>
        <div class="item menu-hover" title="主题">
          <el-color-picker @change="changeTheme" v-model="color"></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';

  @Component
  export default class HeaderWrapper extends Vue {

    @Getter('theme/theme')
    public theme!: string;

    private color: string = '#409EFF';

    private changeTheme(val: string) {
      this.$store.dispatch('theme/setTheme', val);
    }

  }
</script>