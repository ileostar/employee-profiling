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

// page store
export const useMatchingStore = defineStore('matching', () => {

	const PersonPostTableData = ref<Array<TableData>>([])

	return { 
		PersonPostTableData
	}
})
