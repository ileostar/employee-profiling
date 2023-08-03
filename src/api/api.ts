import http from '../util/http'
import { LoginReg, Tag, fixPassword, fixUsername } from './type'

export default {
  /**
   * @desc 用户接口
   */
  login: (params: LoginReg) => {
    return http.get('/user/login', params)
  },
  register: (params: LoginReg) => {
    return http.post('/user/reg', params)
  },
  select: () => {
    return http.get('/user/select')
  },
  updateByPassword: (params: fixPassword) => {
    return http.get('/user/updateByPassword', params)
  },
  
  updateByUsername: (params: fixUsername) => {
    return http.get('/user/updateByUsername', params)
  },
  
  /**
   * @desc 标签接口
   */
  insertTag: (params: { features: string }) => {
    return http.post('/label/insert', params)
  },
  deleteTag: (params:number) => {
    return http.delete('/label/delete?id='+params)
  },
  updateTag: (params: Tag) => {
    return http.put('/label/update', params)
  },
  selectTag: () => {
    return http.get('/label/select')
  },

  /**
   * @desc 员工接口
   */
  // insertEmployee: (params: Login) => {
  //   return http.post('/employee/insert', params)
  // },
  // deleteEmployee: (params: Login) => {
  //   return http.delete('/employee/delete', params)
  // },
  // updateEmployee: (params: Login) => {
  //   return http.put('/employee/update', params)
  // },
  // selectEmployee: (params: Login) => {
  //   return http.get('/employee/select', params)
  // },
  // selectAllEmployee: (params: Login) => {
  //   return http.get('/employee/selectAll', params)
  // },
  // selectEmployeeByNumber: (params: Login) => {
  //   return http.get('/employee/findByNumber', params)
  // },
}
