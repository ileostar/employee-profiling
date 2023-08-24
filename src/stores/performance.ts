import { defineStore } from 'pinia';
import { ref } from 'vue';

export type performanceList = {
  id: number,
  number: number
  name: string
  unit: string
  post: string
  createdTime: string
  scores: number
  factor: number
  employeeId: null | number
}

export const usePerformanceStore = defineStore('performance',()=>{
	const performanceColumn = ref<Array<string>>(['员工编号','员工姓名','部门','职务','岗位','考核月份','月度绩效'])

	const performanceList = ref<Array<performanceList>>([])

	function updatePerformanceList(payload: Array<performanceList>) {
		performanceList.value = payload
	}

	return {
		performanceList,
		performanceColumn,
		updatePerformanceList,
	}
})