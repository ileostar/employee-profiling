import { ref } from 'vue'
import { defineStore } from 'pinia'

type TableData = {
  name: string,
  post: string,
  employeeNumber: string,
  postMaxNumber: string,
  postMinNumber: string,
  averageNumber: string,
}

// page store
export const useMatchingStores = defineStore('matching', () => {

	const PersonPostTableData = ref<Array<TableData>>([])

	return { 
		PersonPostTableData
	}
})
