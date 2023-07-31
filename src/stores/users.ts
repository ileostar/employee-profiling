import { ref } from 'vue'
import { defineStore } from 'pinia'

type Cookie = string
type Infos = {
  [index: string]: unknown
}
export const useUsersStore = defineStore('users', () => {

  const cookie = ref<Cookie>('')
  const infos = ref<Infos>({})
  
  function updateCookie(Cookie: string) {
    cookie.value = Cookie;
    document.cookie = `JSESSIONID=${Cookie}`;
  }

  function updateInfos(payload: Infos){
    infos.value = payload;
  }
  //清除所有cookie函数
  function clearAllCookie() {
    cookie.value = ''
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }


  return { 
    cookie, 
    infos, 
    updateCookie,
    updateInfos,
    clearAllCookie 
  }
}, {
  persist: {
    paths: ['cookie']
  }
})
