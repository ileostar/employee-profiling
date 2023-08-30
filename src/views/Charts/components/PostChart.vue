<template>
	<div class="post-charts">
		<h2 class="post-title">岗位维度</h2>
		<div class="post-chart" ref="chart"></div>
	</div>
</template>

<script lang="ts" setup>
import { useChartStore } from '@/stores/chart'
import { useEmployeeStore } from '@/stores/employee'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const employeeStore = useEmployeeStore()
const chartStore = useChartStore()
const { postChartData, currentClickEmployee } = storeToRefs(chartStore)
const { createdTime } = storeToRefs(employeeStore)

// 筛选数据，处理无脑后端写的数据
const postAverageName = Object.keys(postChartData.value).filter((item) =>
	item.endsWith('平均匹配系数'),
)
const postAverageData = Object.entries(postChartData.value)
	.filter((item) => postAverageName.some((e) => e === item[0]))
	.map((item) => Number(item[1] * 100).toFixed(2))
const postName = Object.keys(postChartData.value)
	.filter((item) => !item.endsWith('平均匹配系数'))
	.map((item) => item.replace('人数', ''))
const postData = Object.entries(postChartData.value)
	.filter((item) =>
		Object.keys(postChartData.value)
			.filter((item) => !item.endsWith('平均匹配系数'))
			.some((e) => e === item[0]),
	)
	.map((item) => item[1])

const postPerson =
	postData.reduce((a, b) => a + b, 0) / 100 > 1
		? Number((postData.reduce((a, b) => a + b, 0) / 100).toFixed(0)) * 100
		: 100

// 一进来就调用
onMounted(() => {
	init()
})

const chart = ref()

const init = async () => {
	const myChart = echarts.init(chart.value)
	let option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999',
				},
			},
		},
		toolbox: {
			feature: {
				dataView: { show: true, readOnly: false },
				magicType: { show: true, type: ['line', 'bar'] },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		legend: {
			data: ['岗位人数', '人岗匹配系数'],
		},
		xAxis: [
			{
				type: 'category',
				data: postName,
				axisPointer: {
					type: 'shadow',
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				name: '岗位人数',
				min: 0,
				max: postPerson,
				interval: Number((postPerson / 5).toFixed(0)),
				axisLabel: {
					formatter: '{value} 人',
				},
			},
			{
				type: 'value',
				name: '人岗匹配系数',
				min: 50,
				max: 100,
				interval: 10,
				axisLabel: {
					formatter: '{value} ',
				},
			},
		],
		series: [
			{
				name: '岗位人数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value: string) {
						return Math.round(Number(value)) + ' 人'
					},
				},
				data: postData,
			},
			{
				name: '人岗匹配系数',
				type: 'line',
				yAxisIndex: 1,
				tooltip: {
					valueFormatter: function (value: string) {
						return value
					},
				},
				data: postAverageData,
			},
		],
	}
	myChart.setOption(option)
	// 监听点击事件，并获取当前柱体信息
	myChart.on('click', params => {
		// 当前点击的柱体索引
		const dataIndex = params.dataIndex;

		// 在这里根据需要进行相应的处理
		console.log('当前点击的柱体值：', postName[dataIndex]);
		currentClickEmployee.value = postName[dataIndex]
    
		chartStore.updateTagChartData(createdTime.value)
	});
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
