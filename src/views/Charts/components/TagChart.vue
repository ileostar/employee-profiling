<script lang="ts" setup>
import * as echarts from 'echarts'
import * as _ from 'lodash'

const chartStore = useChartStore()
const { tagChartData,currentClickEmployee,selectOptions,currentSelectOption } = storeToRefs(chartStore)

// 饼图数据
const tagPieChartData = ref<Array<any>>()

watchEffect(() => {
	if(_.isEmpty(tagChartData.value)) return false
	tagPieChartData.value = Object.entries(tagChartData.value[currentSelectOption.value].count).map(item => ({
		value: item[1],
		name: item[0]
	}))
	nextTick(() => {
		init()
	})
})

// 一进来就调用
onMounted(() => {
	init()
})

const handleSelectChange = () => {
	if(_.isEmpty(tagChartData.value)) return false
	tagPieChartData.value = Object.entries(tagChartData.value[currentSelectOption.value].count).map(item => ({
		value: item[1],
		name: item[0]
	}))

	nextTick(() => {
		init()
	})
}

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
						fontSize: 25,
						fontWeight: 'bold',
					},
				},
				labelLine: {
					show: false,
				},
				data: tagPieChartData.value,
			},
		],
	}
	myChart.setOption(option)

	console.log(tagChartData.value);

}
</script>

<template>
	<div class="tag-charts">
		<h2 class="tag-title">标签维度</h2>
    <div class="tag-select">
      <p><strong>当前岗位：</strong>{{currentClickEmployee}}</p>
      <el-select v-model="currentSelectOption" class="m-2" small @change="handleSelectChange" :default-first-option="true">
        <el-option
          v-for="item in selectOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
		<div class="tag-chart" ref="chart"></div>
	</div>
</template>

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
  .tag-select {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 2vw;
    justify-content: space-between;
    :deep(.el-select) {
      padding-right: 2vw;
      width: 23vw;
    }
  }
	.tag-chart {
		width: 40vw;
		height: 64vh;
	}
}
</style>
