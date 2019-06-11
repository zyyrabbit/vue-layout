<template>
  <el-row type="flex" justify="center" class="leaf-components">
    <el-col :span="20">
      <component-render
        v-for="config in configs"
        :key="config.name"
        :config="config"
        class="leaf-components__item"
        draggable="true"
        @dragstart.native="dragStart($event, config)"
      ></component-render>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import configs from '@/utils/componentConfig.ts';
import ComponentRender from './render.vue';
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
    background-color: #eee;
    &__item {
      margin-top: 20px;
    }
  }
</style>
