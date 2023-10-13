import api from '@/api/api';
import { Performance } from '@/api/type'
import { defineStore } from 'pinia';
import { ref } from 'vue';

export type performanceList = {
  id?: number,
  number?: number
  name?: string
  unit?: string
  post?: string
  createdTime?: string
  scores?: number
  factor?: number
  employeeId?: null | number
}

export const usePerformanceStore = defineStore('performance',()=>{
	const performanceColumn = ref<Array<string>>(['员工编号','员工姓名','部门','职务','岗位','考核月份','月度绩效'])

	const performanceList = ref<Array<performanceList>>([])

	const dialogEditFormVisible = ref(false)
	const formEdit = ref<Performance>({})
  
	/**
	 * Updates the performance list with the given payload.
	 *
	 * @param {Array<performanceList>} payload - The new performance list.
	 */
	function updatePerformanceList(payload: Array<performanceList>) {
		performanceList.value = payload
	}

	/**
	 * Refreshes the performance data.
	 *
	 * @return {Promise<void>} - Returns a promise that resolves with no value.
	 */
	const refreshPerformance = async () => { 
		const res = await api.selectPerformane()
		if(res.data.state === 200) {
			updatePerformanceList(res.data.data)   
		} else {
			return
		}
	}

	return {
		performanceList,
		performanceColumn,
		dialogEditFormVisible,
		formEdit,
		updatePerformanceList,
		refreshPerformance
	}
})