import { ref } from 'vue'
import { defineStore } from 'pinia'

type Token = string
export type Infos = {
	id?: number
	username?: string
	password?: string
	salt?: string
	createdTime?: string
	role?: string
  avatar?: string
}

export const useUsersStore = defineStore('users',() => {
	const token = ref<Token>('')
	const infos = ref<Infos>({})
	const allUsers = ref<Array<Infos>>([])

	function updateToken(payload: Token) {
		token.value = payload
	}

	function updateAllUsers(payload: Array<Infos>) {
		allUsers.value = payload
	}

	function updateInfos(payload: Infos) {
		infos.value = payload
	}

	function updatePassword(payload: string) {
		infos.value.password = payload
	}

	function clearToken() {
		token.value = ''
		localStorage.clear()
	}

	return {
		token,
		infos,
		allUsers,
		updateToken,
		updateInfos,
		updateAllUsers,
		updatePassword,
		clearToken
	}
},{
	persist: {
		paths: ['token', 'infos'],
	},
})
