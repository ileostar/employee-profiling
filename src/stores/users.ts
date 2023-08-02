import { ref } from 'vue'
import { defineStore } from 'pinia'

type Token = string
type Infos = {
  id?: number
  username?: string
  password?: string
  role?: string
  [index: string]: unknown
}
export const useUsersStore = defineStore('users', () => {

  const token = ref<Token>('')
  const infos = ref<Infos>({})
  
  function updateToken(payload: Token) {
    token.value = payload;

  }

  function updateInfos(payload: Infos){
    infos.value = payload;
  }

  function updatePassword(payload: string){
    infos.value.password = payload;
  }
  
  function clearToken() {
    token.value = ''
  }


  return { 
    token, 
    infos, 
    updateToken,
    updateInfos,
    updatePassword,
    clearToken
  }
}, {
  persist: {
    paths: ['token','infos']
  }
})
