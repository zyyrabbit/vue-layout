<template>
  <el-row type="flex" justify="center" class="leaf-attrs">
    <el-col :span="20">
      <h3 class="leaf-attrs--title">属性编辑</h3>
      <el-form v-if="selectConfig">
        <el-form-item>{{selectConfig.name}}</el-form-item>
        <!-- props -->
        <el-form-item>Props</el-form-item>
        <el-form-item v-for="key of filterProps" :key="key" :label="key">
          <attr-render 
            :config="selectConfig"
            :obj-key="key"
            @change="change($event, key)"
            type="props"
            v-model="selectConfig.props[key]">
          </attr-render>
        </el-form-item>
        <!-- 属性 -->
        <el-form-item>Attrs</el-form-item>
        <el-form-item v-for="key of filterAttrs" :key="key" :label="key">
          <attr-render
            :config="selectConfig" 
            :obj-key="key"
            type="attrs"
            v-model="selectConfig.attrs[key]">
          </attr-render>
        </el-form-item>
        <!-- class -->
        <el-form-item>Style</el-form-item>
        <el-form-item>
          <div>class</div>
          <el-input v-model="selectConfig.class"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AttrRender from './attrRender.vue';
import { 
  objForEach,
  filterAttrs,
  index
} from '@/utils';
@Component({
  components: {
    AttrRender
  }
})
export default class Attrs extends Vue {
  @Prop({ default: () => {} })
  private selectConfig!: any;
  // props
  get filterProps() {
    let props: string[] = [];
    objForEach(this.selectConfig.props, key => {
      props.push(key);
    })
    return props;
  }
  // 属性
  get filterAttrs() {
    let attrs: string[] = [];
    objForEach(this.selectConfig.attrs, key => {
      if (!filterAttrs[key]) {
        attrs.push(key);
      }
    })
    return attrs;
  }
  // 处理prop
  private change(val: string, key: string) {
    if (isNaN(Number(val))) {
      this.selectConfig.props[key] = 0;
    }
  }

}
</script>
<style lang="scss">
  .leaf-attrs {
    border-left: 1px solid #ccc;
    height: 100%;
    background-color: #eee;
    overflow-y: auto;
    &--title {
      padding: 20px 0;
    }
  }
</style>
