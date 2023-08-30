import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import { Employee } from '@/api/type'

export type EmployeeName = {
  id: number
  name: string
  number: number
}

export type EmployeeInfos = {
  id: number
  name: string
  unit: string
  post: string
  createdTime: string
}

type postTagEmployeeInfo = {
  'id': number
  'postGoodFeaturesMessage': Array<string>
  'employeeGoodFeaturesMessage':  Array<string|null>
  'employeeBadFeaturesMessage':  Array<string|null>
}

export type postCountFactor = {
  id: number
  post: string
  factor: number
  max: number
  min: number
  avg: number
}

export const useEmployeeStore = defineStore('employee', () => {
	const createdTime = ref<string>('')
	const createdTimeList = ref<Array<string>>([])
	const EmployeeList = ref<Array<string>>([])

	// 员工信息
	const dialogFixFormVisible = ref(false)
	const form2 = ref<Employee>({})

	// 画像信息
	const currentEmployee = ref<string>('')
	const currentEmployeeInfos = ref<EmployeeInfos>()
	const portraitFeature = ref<Employee>({})
	const tagEmployeeInfo = ref<Array<string>>([])
	const postTagEmployeeInfos = ref<postTagEmployeeInfo>()
	const postCountFactors = ref<Array<postCountFactor>>([]) // 处理过的数据
  
	// 画像侧边栏
	const EmployeeNameList = ref<Array<EmployeeName>>([])
	const pageNumber = ref<number>()

	function updateCurrentEmployee(payload: string) {
		currentEmployee.value = payload
	}

	function updateCurrentEmployeeInfos(payload: EmployeeInfos) {
		currentEmployeeInfos.value = payload
	}

	function updatePortraitFeature(payload: Employee) {
		portraitFeature.value = payload
	}

	function updatePageNumber(payload: number) {
		pageNumber.value = payload
	}

	function updateCreatedTimeList(payload: Array<string>) {
		createdTimeList.value = payload
		createdTime.value = payload[0]
	}

	function addEmployeeList(payload: any){
		EmployeeList.value.push(payload)
	}

	function updateEmployeeList(payload: any) {
		EmployeeList.value = payload
	}

	function updateEmployeeNameList(payload: any) {
		EmployeeNameList.value = payload
	}

	function updateTagEmployeeInfo(payload: Array<string>) {
		tagEmployeeInfo.value = payload
	}

	function updatePostCountFactors(payload: Array<postCountFactor>){
		postCountFactors.value = payload
	}

	const refreshEmployeeList = async () => {
		const res = await api.selectEmployee({createdTime: createdTime.value})
		if(res.data.state===200) {
			updateEmployeeList(res.data.data)
		}
	}

	const updatePostTagEmployeeInfo = (payload: any) => {
		postTagEmployeeInfos.value = payload
	}

	const ToggleEmployee = async (employeeNumber : number) => {
		const req = {createdTime: createdTime.value,number: employeeNumber}
		// 查询当前员工信息
		const res1 = await api.getEmployeeMessage(req)
		if(res1.data.state === 200) { 
			updatePortraitFeature(res1.data.data)
		}
		const res2 = await api.getPostFeatures(req)
		if(res2.data.state === 200) { 
			updateCurrentEmployeeInfos(res2.data.data)
		}
		const res3 = await api.getEmployeeNiceFeatures(req)
		if(res3.data.state === 200) { 
			updateTagEmployeeInfo(res3.data.data)
		}

		const res4 = await api.getPostFeaturesByNumberAndPost({...req,post:portraitFeature.value.post as string})
		if(res4.data.state === 200) { 
			updatePostTagEmployeeInfo(res4.data.data)
		}

		const res5 = await api.getPostCountFactorByNumber(req)
		if(res5.data.state === 200) {
			const handleRes5 = res5.data.data.map((item:postCountFactor) => {
				const {post,factor,max,min,avg} = item
				return {
					post,
					factor: Number(factor).toFixed(2),
					max: Number(max).toFixed(2),
					min: Number(min).toFixed(2),
					avg: Number(avg).toFixed(2)  
				}
			})
			updatePostCountFactors(handleRes5)
		}
	}

	return { 
		createdTime,
		createdTimeList,
		EmployeeList,
		currentEmployee,
		EmployeeNameList,
		pageNumber,
		portraitFeature,
		currentEmployeeInfos,
		dialogFixFormVisible,
		form2,
		tagEmployeeInfo,
		postTagEmployeeInfos,
		postCountFactors,
		addEmployeeList,
		updateCreatedTimeList,
		updateEmployeeList,
		updateEmployeeNameList,
		updatePortraitFeature,
		updatePageNumber,
		updateCurrentEmployee,
		updateCurrentEmployeeInfos,
		refreshEmployeeList,
		updateTagEmployeeInfo,
		ToggleEmployee
	}
},{
	persist: {
		paths: ['createdTime']
	}
})
