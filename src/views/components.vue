<template>
  <el-row type="flex" justify="center" class="leaf-components">
    <el-col :span="20">
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
  private activeUI = 'element-ui';

  private  dragStart(e: any, config: any) {
    e.dataTransfer.setData('config', JSON.stringify(config));
  }
}
</script>
<style lang="scss">
  .leaf-components {
    padding: 20px 0;
    border-right: 1px solid #ccc;
    height: 100%;
    overflow-y: auto;
    background-color: #eee;
    &__item {
      &--title {
        line-height: 40px;
      }
      margin-top: 20px;
    }
  }
</style>
