<template>
  <div class="charts" ref="charts"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
let charts = ref();
onMounted(() => {
  let mychart = echarts.init(charts.value);
  mychart.setOption({
    title: {
      //   text: '游客消费',
      textStyle: {
        color: 'white',
      },
    },
    // backgroundColor: '#001134',

    tooltip: {},
    legend: {
      show: false,
      // data: ['我的酒店', '商圈','城市']
    },
    radar: {
      shape: 'circle',
      name: {
        textStyle: {
          color: '#000',
          // backgroundColor: '#999',
          borderRadius: 2,
          padding: [3, 5],
        },
      },
      splitLine: {
        lineStyle: {
          color: '#999',
        },
      },
      splitArea: {
        show: false,
      },
      indicator: [
        {
          name: 'JavaScript',
          max: 100,
        },
        {
          name: 'TypeScript',
          max: 100,
        },
        {
          name: 'Vue',
          max: 100,
        },
        {
          name: 'React',
          max: 100,
        },
        {
          name: 'Nodejs',
          max: 100,
        },
        {
          name: 'Nestjs',
          max: 100,
        },
        {
          name: 'Threejs',
          max: 100,
        },
        {
          name: 'Ammojs',
          max: 100,
        },
        {
          name: '微信小程序',
          max: 100,
        },
        {
          name: 'Electron',
          max: 100,
        },
      ],
    },
    series: [
      {
        name: '技术组成',
        type: 'radar',
        // areaStyle: {normal: {}},
        connectNulls: false,
        data: [
          {
            value: [0, 0, 0, 0, 70, 50, 0, 0, 0, 0],
            name: '前端技术',
            symbol: 'none',

            itemStyle: {
              // 多边形线颜色
              color: '#fde532',
            },
            areaStyle: {
              opacity: 0.5,
            },
          },
          {
            value: [90, 85, 85, 55, 0, 0, 75, 70, 90, 70],
            name: '服务端技术',
            symbol: 'none',

            itemStyle: {
              // 多边形线颜色
              color: '#ff801b',
            },
            areaStyle: {
              opacity: 0.5,
            },
          },
        ],
      },
    ],
  });
});
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
