<template>
  <el-row class="leaf-components" type="flex" justify="center">
    <el-col :span="20">
      <h3 class="leaf-components--title">组件列表</h3>
      <div v-for="config in configs" :key="config.name"  class="leaf-components__item">
        <h4 class="leaf-components__item--title">{{config.name}}</h4>
        <component-render
          :config="config"
          draggable="true"
          @dragstart.native="dragStart($event, config)">
       </component-render>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { configs } from '@/utils';
import ComponentRender from './componentRender.vue';
@Component({
  components: {
    ComponentRender
  }
})
export default class Components extends Vue {

  private configs = configs;

  private dragStart(e: any, config: any) {
    e.dataTransfer.setData('config', JSON.stringify(config));
  }
}
</script>
<style lang="scss">
  .leaf-components {
    border-right: 1px solid #ccc;
    height: 100%;
    overflow-y: auto;
    background-color: #eee;
    &--title {
      padding-top: 20px;
    }
    &__item {
      &--title {
        line-height: 40px;
      }
      margin-top: 20px;
      &:last-child {
         margin-bottom: 20px;
      }
    }
  }
</style>
