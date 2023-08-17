import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
	const postData = ref<string[]>(['客户专员','市场经理','终端专员','综合管理员','信息专员'])

	return {
		postData
	}
},{
	persist: {
		paths: ['postData']
	},
})
