/* eslint-disable indent */
import { ref } from 'vue'
import { defineStore } from 'pinia'

type chartData = {
	总体匹配系数?: number
	员工总数?: number
	平均年龄?: number
	岗位总数?: number
}
type PostData = {
	市场经理人数?: number
	终端专员人数?: number
	信息专员人数?: number
	终端专员平均匹配系数?: number
	客户专员平均匹配系数?: number
	客户专员人数?: number
	信息专员平均匹配系数?: number
	综合管理员平均匹配系数?: number
	市场经理平均匹配系数?: number
	综合管理员人数?: number
}
export const useChartStore = defineStore('chart', () => {
	const smallChartData = ref<chartData>({})
	const postChartData = ref<PostData>({})

	function updateSmallChartData(payload: chartData) {
		smallChartData.value = payload
	}
	function updatePostChartData(payload: PostData) {
		postChartData.value = payload
	}

	return {
		smallChartData,
		postChartData,
		updateSmallChartData,
		updatePostChartData,
	}
})
