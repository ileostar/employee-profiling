import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('employee', () => {
	const createdTime = ref<string>('2023-05')
	const count = ref(0)
	const doubleCount = computed(() => count.value * 2)
	function increment() {
		count.value++
	}

	return { createdTime, doubleCount, increment }
})
