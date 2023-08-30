/* eslint-disable indent */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'

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
	const tagChartData = ref<any>({})
  const currentClickEmployee = ref<string>('市场经理')

  
  // 下拉列表
  const selectOptions = ref<Array<string>>([])
  const currentSelectOption = ref('')


	function updateSmallChartData(payload: chartData) {
		smallChartData.value = payload
	}
	function updatePostChartData(payload: PostData) {
		postChartData.value = payload
	}
	const  updateTagChartData = async (time: string) => {
    const res = await api.cockpit({createdTime:time,post:currentClickEmployee.value})
    if (res.data.state === 200) {
      tagChartData.value = res.data.data
    }
    selectOptions.value = Object.keys(tagChartData.value)
    currentSelectOption.value = Object.keys(tagChartData.value)[0]
	}

	return {
		smallChartData,
		postChartData,
    tagChartData,
    currentClickEmployee,
    selectOptions,
    currentSelectOption,
		updateSmallChartData,
		updatePostChartData,
    updateTagChartData,
	}
})
