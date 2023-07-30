import { ref } from 'vue'
import { defineStore } from 'pinia'

type Token = string
type Infos = {
  [index: string]: unknown
}
export const useUsersStore = defineStore('users', () => {

  const token = ref<Token>('')
  const infos = ref<Infos>({})
  
  function updateToken(payload: Token){
    token.value = payload;
  }
  function updateInfos(payload: Infos){
    infos.value = payload;
  }
  function clearToken(){
    token.value = '';
  }

  return { 
    token, 
    infos, 
    updateToken,
    updateInfos,
    clearToken 
  }
}, {
  persist: {
    paths: ['token']
  }
})
