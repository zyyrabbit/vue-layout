<template>
  <el-row class="leaf-main">
    <el-col :span="4" class="leaf-main__left">
      <components/>
    </el-col>
    <el-col :span="20" class="leaf-main__content">
      <container/>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import components from './components.vue';
import container from './container.vue';

@Component({
  components: {
    components,
    container
  }
})
export default class Main extends Vue {
}
</script>
<style lang="scss">
  .leaf-main {
    height: 100%;
    &__left,  &__content {
      height: 100%;
      overflow-y: auto;
    }
  }
</style>
