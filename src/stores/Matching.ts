import { ref } from 'vue'
import { defineStore } from 'pinia'

type TableData = {
  name: string,
  post: string,
  number: number,
  max: number,
  min: number,
  factor: number,
  avg: number,
}
type emloyeeNumberOption = {
  value: string
  label: string
}
type Infos = {
	number: '',
	name: '',
	post: '',
	scores: '',
	factor: ''
  [key: string]: unknown
}

type TagAnalyzeResult = {
  name: string,
  post: string,
  employeeTag: Array<string>,
  postTag: Array<string|null>,
}

// page store
export const useMatchingStore = defineStore('matching', () => {
  
	const emloyeeNumberOptions = ref<Array<emloyeeNumberOption>>([])
	const formPersonPost = ref({
		name: '',
		post: '',
	})

	// 保存人岗匹配分析结果
	const currentTagAnalyzeResult = ref<TagAnalyzeResult>({
		name: '',
		post: '',
		employeeTag: [],
		postTag: [],
	})
	// 保存岗位匹配分析结果
	const currentPostMatchingTable = ref<Array<Infos>>([])
  
	const formPostMatching = ref({
		post: ''
	})
	const currentEmloyeeNumber = ref('')

	const PersonPostTableData = ref<Array<TableData>>([])

	return { 
		PersonPostTableData,
		formPersonPost,
		emloyeeNumberOptions,
		currentTagAnalyzeResult,
		formPostMatching,
		currentPostMatchingTable,
		currentEmloyeeNumber
	}
},{
	persist:{
		paths: ['formPersonPost','currentEmloyeeNumber','PersonPostTableData','emloyeeNumberOptions','currentTagAnalyzeResult','formPostMatching','currentPostMatchingTable']
	}
})
