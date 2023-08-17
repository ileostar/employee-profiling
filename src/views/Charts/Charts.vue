<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="charts">
		<h1 class="title">数据展示</h1>
		<div class="small-charts">
			<SmallChart
				v-for="i in 4"
				:key="i"
				:image="image[i - 1]"
				:chart="chart[i - 1]"
				:chartData="chartInfo[i - 1]"
			></SmallChart>
		</div>
		<div class="big-charts">
			<PostChart></PostChart>
			<TagChart></TagChart>
		</div>
	</div>
</template>

<script setup lang="ts">
import SmallChart from './components/SmallChart.vue'
import TagChart from './components/TagChart.vue'
import PostChart from './components/PostChart.vue'
import image1 from '@/assets/images/icon-1.png'
import image2 from '@/assets/images/icon-2.png'
import image3 from '@/assets/images/icon-3.png'
import image4 from '@/assets/images/icon-4.png'
import chart1 from '@/assets/images/chart-1.png'
import chart2 from '@/assets/images/chart-2.png'
import chart3 from '@/assets/images/chart-3.png'
import chart4 from '@/assets/images/chart-4.png'
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'
const image = Array.of(image2, image1, image3, image4)
const chart = Array.of(chart2, chart1, chart3, chart4)
const chartStore = useChartStore()
const { smallChartData } = storeToRefs(chartStore)
const chartInfo = Object.entries(smallChartData.value)
</script>

<style lang="scss" scoped>
.charts {
	display: flex;
	flex-direction: column;
	padding: 3vh;
	.small-charts {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 2vh;
	}
	.big-charts {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
