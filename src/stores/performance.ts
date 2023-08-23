import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePerformanceStore = defineStore('performance',()=>{
	const performanceColumn = ref<Array<string>>(['员工编号','员工姓名','部门','职务','岗位','考核月份','月度绩效'])

	const performanceList = ref<Array<string>>([])

	function updatePerformanceList(payload: Array<string>) {
		performanceList.value = payload
	}

	return {
		performanceList,
		performanceColumn,
		updatePerformanceList,
	}
})