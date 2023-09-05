import { ref } from 'vue'
import { defineStore } from 'pinia'
// import api from '@/api/api'
// import { ElMessage } from 'element-plus'

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

	// const getUserVerifyCode = async () => {
	// 	const res = await api.getVerifyCode()
	// 	if( res.status === 200 ) {
      
	// 	} else {
	// 		ElMessage.error('验证码获取失败！')
	// 	}
	// }

	return {
		token,
		infos,
		allUsers,
		updateToken,
		updateInfos,
		updateAllUsers,
		updatePassword,
		clearToken,
		getUserVerifyCode
	}
},{
	persist: {
		paths: ['token', 'infos'],
	},
})
