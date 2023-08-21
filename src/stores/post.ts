import { ref } from 'vue'
import { defineStore } from 'pinia'

type rowAnalyzeRelation = {
  id: number,
  features: string,
  weight: number,
  niceFeatures: string,
  niceNumber: number,
  badFeatures: string,
  badNumber: number
}

type rowAnalyzeMatching = {
  createdTime: string,
  employeeId: number,
  factor: number,
  id: number,
  name: string,
  number: number,
  post: string,
  scores: number,
  unit: string
}

export const usePostStore = defineStore('post', () => {
	const postData = ref<string[]>(['客户专员','市场经理','终端专员','综合管理员','信息专员'])
	const analyzeRelationList = ref<Array<rowAnalyzeRelation>>([])
	const analyzeMatchingList = ref<Array<rowAnalyzeMatching>>([])
	const unitList = ref<Array<string>>([])

	function updateAnalyzeRelation(payload: Array<rowAnalyzeRelation>) {
		analyzeRelationList.value = payload
	}

	function updateAnalyzeMatching(payload: Array<rowAnalyzeMatching>) {
		analyzeMatchingList.value = payload
	}
	function updateUnitList(payload: string[]) {
		unitList.value = payload
	}

	return {
		postData,
		unitList,
		analyzeRelationList,
		analyzeMatchingList,
		updateAnalyzeRelation,
		updateAnalyzeMatching,
		updateUnitList
	}
},{
	persist: {
		paths: ['postData']
	},
})
