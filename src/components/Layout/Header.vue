<template>
  <div class="header-wrapper" :style="{ 'background-color': theme }">
    <div class="header-wrapper__left" :style="{ 'background-color': theme }">
      <div class="header-wrapper__left--brand-img"></div>
      <div class="header-wrapper__left--brand-text">
        Leaf-Vue-Layout
      </div>
      <div class="header-wrapper__left--brand-btn" @click.stop="onMobileToggle">
        <svg-icon name="indent"></svg-icon>
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
   
    private themes: any[] = [
      {
        key: 1,
        value: '#ccc'
      },
      {
        key: 2,
        value: '#123'
      },
      {
        key: 3,
        value: '#456'
      }
    ]

    private color: string = '#409EFF';
    private onMobileToggle() {
      this.$emit('toggle');
    }

    private changeTheme(val: string) {
      this.$store.dispatch('theme/setTheme', val);
    }

  }
</script>