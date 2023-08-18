import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePerformanceStore = defineStore('performance',()=>{
	const performanceList = ref<string[]>(['员工编号','员工姓名','部门','职务','岗位','考核月份','月度绩效'])

	function addPerformanceList(payload: any){
		performanceList.value.push(payload)
	}

	function updatePerformanceList(payload: any) {
		performanceList.value = payload
	}

	return {
		performanceList,
		addPerformanceList,
		updatePerformanceList
	}
})