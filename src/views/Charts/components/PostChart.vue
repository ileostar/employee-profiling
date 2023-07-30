<template>
    <div class="post-charts">
        <h2 class="post-title">岗位维度</h2>
        <div class="post-chart" ref="chart"></div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

// 一进来就调用
onMounted(() => {
  init()
})

const chart = ref();

const  init = async ()=> {
  const myChart = echarts.init(chart.value);
  let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'cross',
        crossStyle: {
            color: '#999'
        }
        }
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    legend: {
        data: ['岗位人数', '人岗匹配系数']
    },
    xAxis: [
        {
            type: 'category',
            data: ['客户专员', '终端专员', '综合管理员', '市场经理', '信息专员'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '岗位人数',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} 人'
            }
        },
        {
            type: 'value',
            name: '人岗匹配系数',
            min: 75,
            max: 100,
            interval: 5,
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
        name: '岗位人数',
        type: 'bar',
        tooltip: {
            valueFormatter: function (value: string) {
            return Math.round(Number(value)) + ' 人';
            }
        },
        data: [
            73.0, 34.9, 57.0, 23.2, 85.6
        ]
        },
        {
        name: '人岗匹配系数',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
            valueFormatter: function (value: string) {
            return value;
            }
        },
        data: [89.0, 90.3, 86.3, 84.5, 85.3]
        }
    ]
    };
  myChart.setOption(option)
}

</script>

<style lang="scss" scoped>
.post-charts {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    width: 42vw;
    height: 64vh;
    background-color: #fff;
    box-shadow: 3px 3px 8px 3px rgb(29 35 41 / 13%);
    border-radius: 5px;
    padding: 2vw;
    .post-title {
        margin-bottom: 30px;
        font-size: 1.3vw;
        font-weight: 400;
        letter-spacing: 2px;
    }
    .post-chart {
        width: 40vw;
        height: 60vh;
    }
}
</style>