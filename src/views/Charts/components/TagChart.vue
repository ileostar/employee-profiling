<template>
	<div class="tag-charts">
		<h2 class="tag-title">标签维度</h2>
		<div class="tag-chart" ref="chart"></div>
	</div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

// 一进来就调用
onMounted(() => {
	init()
})

const chart = ref()

const init = async () => {
	const myChart = echarts.init(chart.value)
	let option = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			top: '5%',
			left: 'center',
		},
		series: [
			{
				name: '人数',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2,
				},
				label: {
					show: false,
					position: 'center',
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold',
					},
				},
				labelLine: {
					show: false,
				},
				data: [
					{ value: 32, name: '是否有体育特长' },
					{ value: 21, name: '是否有艺术特长' },
					{ value: 36, name: '公文写作能力' },
					{ value: 14, name: '数据分析能力' },
					{ value: 10, name: '是否有省局轮训经历' },
				],
			},
		],
	}
	myChart.setOption(option)
}
</script>

<style lang="scss" scoped>
.tag-charts {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	align-items: center;
	width: 39.5vw;
	height: 64vh;
	box-shadow: 3px 3px 8px 3px rgb(29 35 41 / 13%);
	border-radius: 5px;
	padding: 2vw;
	.tag-title {
		margin-bottom: 18px;
		font-size: 1.3vw;
		font-weight: 400;
		letter-spacing: 2px;
	}
	.tag-chart {
		width: 40vw;
		height: 64vh;
	}
}
</style>
