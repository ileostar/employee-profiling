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
        :titles="titleMessage(i)"
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
import image1 from '@/assets/images/总体画像系数.png'
import image2 from '@/assets/images/员工总数.png'
import image3 from '@/assets/images/平均年龄.png'
import image4 from '@/assets/images/岗位管理.png'
import chart1 from '@/assets/images/chart-1.png'
import chart2 from '@/assets/images/chart-2.png'
import chart3 from '@/assets/images/chart-3.png'
import chart4 from '@/assets/images/chart-4.png'
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const image = Array.of(image1, image2, image3, image4)
const chart = Array.of(chart2, chart1, chart3, chart4)
const chartStore = useChartStore()
const { smallChartData } = storeToRefs(chartStore)
const chartInfo = Object.entries(smallChartData.value)

/**
 * 返回charts提示信息
 *
 * @param {number} val - The value used to determine the message.
 * @return {string} The message based on the provided value.
 */
const titleMessage = (val: number) => {
	let res = ref('')
	if(val===1) {
		res.value = '所有岗位的平均匹配系数'
	} else if (val === 2) {
		res.value = '员工总数'
	} else if (val === 3) {
		res.value = '员工平均年龄'
	} else {
		res.value = '系统岗位总数'
	}
	return res.value
}
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
