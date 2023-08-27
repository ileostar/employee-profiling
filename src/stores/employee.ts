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

	const refreshEmployeeList = async () => {
		const res = await api.selectEmployee({createdTime: createdTime.value})
		if(res.data.state===200) {
			updateEmployeeList(res.data.data)
		}
	}

	const ToggleEmployee = async (employeeNumber : number) => {
		const req = {createdTime: createdTime.value,number: employeeNumber}
		// 查询当前员工信息
		const res2 = await api.getEmployeeMessage(req)
		if(res2.data.state === 200) { 
			updatePortraitFeature(res2.data.data)
		}
		const res3 = await api.getPostFeatures(req)
		if(res3.data.state === 200) { 
			updateCurrentEmployeeInfos(res3.data.data)
		}
		const res4 = await api.getEmployeeNiceFeatures(req)
		if(res4.data.state === 200) { 
			updateTagEmployeeInfo(res4.data.data)
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
