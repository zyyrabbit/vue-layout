<template>
  <div class="g2-size" :id="id"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import G2 from '@antv/g2';

@Component
export default class G2BarChart extends Vue {

  @Prop({
    default: 'g2-bar-chart'
  })
  private id!: string;

  private data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
  ];


  mounted() {
    // Step 1: 创建 Chart 对象
    const chart = new G2.Chart({
      container: this.id, // 指定图表容器 ID
      width : 200, // 指定图表宽度
      height : 200 // 指定图表高度
    });
    // Step 2: 载入数据源
    chart.source(this.data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre')
    // Step 4: 渲染图表
    chart.render();
  }
}
</script>

