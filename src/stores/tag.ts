import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Infos = {
	id?: number
	features?: string
}

export const useTagStore = defineStore('tag', () => {
	const info = ref<Array<Infos>>([])

	function updateTagInfos(payload: Array<Infos>) {
		info.value = payload
	}

	return {
		info,
		updateTagInfos,
	}
})
