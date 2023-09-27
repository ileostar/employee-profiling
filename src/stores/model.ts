import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModelStore = defineStore('model', () => {
	const currentModel = ref('')
	const modelTotal = ref()

	function updateCurrentModel() {
		console.log(currentModel.value)
	}

	const updateModelTotal = async () => {
		const res = await api.selectModels()
		if( res.status === 200 ) {
			modelTotal.value = res.data
		}
	}

	return {
		currentModel,
		modelTotal,
		updateCurrentModel,
		updateModelTotal
	}
})