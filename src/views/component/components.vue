<template>
  <el-row class="leaf-components" type="flex" justify="center">
    <el-col :span="20">
      <div class="leaf-components__type">
        <el-select v-model="type">
          <el-option
            v-for="type of types"
            :key="type"
            :label="type"
            :value="type">
          </el-option>
        </el-select>
      </div>
      <div class="leaf-components__comps">
        <div 
          v-for="config in configs[type]" 
          :key="config.name" 
          :config="config"
          draggable="true"
          @dragstart="dragStart($event, config)"
          class="leaf-components__item">
          <div class="leaf-components__item--icon">
            <svg-icon name="layout"></svg-icon>
          </div>
          <h4 class="leaf-components__item--title">{{config.name}}</h4>

        <!--  <h4 class="leaf-components__item--title">{{config.name}}</h4>
          <component-render
            :config="config"
            draggable="true"
            @dragstart.native="dragStart($event, config)">
        </component-render> -->

        </div>
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
  private types: string[] = ['Element-UI', 'G2', 'HTML'];
  private type: string = 'Element-UI';

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
    &__type {
      padding-top: 20px;
      .el-input__inner {
        border: none!important;
        border-bottom: 1px solid #aaa!important;
      }
    }

    &__comps {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin-top: 10px;
      border: 2px dotted #ddd;
     
      cursor: move;
      background: #fff;
      padding: 0 10px;
     

      &--icon {
        >svg {
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
        
      }

      &--title {
        line-height: 40px;
      }

      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
</style>
