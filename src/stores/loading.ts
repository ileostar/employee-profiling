import { ref } from 'vue'
import { defineStore } from 'pinia'

// page store
export const useLoading = defineStore('loading', () => {
	
	const loading = ref<boolean>(false)

	const onLoading = (payload: boolean)=>{
		loading.value = payload
	}

	return { loading,onLoading }
})
