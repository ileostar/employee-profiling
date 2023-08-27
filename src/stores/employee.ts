/* eslint-disable indent */
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
  const portraitFeature = ref<Array<any>>([])
  
  // 画像侧边栏
  const EmployeeNameList = ref<Array<EmployeeName>>([])
  const pageNumber = ref<number>()

  function updateCurrentEmployee(payload: string) {
		currentEmployee.value = payload
	}

  function updateCurrentEmployeeInfos(payload: EmployeeInfos) {
		currentEmployeeInfos.value = payload
	}

  function updatePortraitFeature(payload: Array<any>) {
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

  const refreshEmployeeList = async () => {
    const res = await api.selectEmployee({createdTime: createdTime.value})
    if(res.data.state===200) {
      updateEmployeeList(res.data.data)
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
    addEmployeeList,
    updateCreatedTimeList,
    updateEmployeeList,
    updateEmployeeNameList,
    updatePortraitFeature,
    updatePageNumber,
    updateCurrentEmployee,
    updateCurrentEmployeeInfos,
    refreshEmployeeList
  }
},{
  persist: {
    paths: ['createdTime']
  }
})
