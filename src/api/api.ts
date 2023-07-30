import http from '../util/http'
import { LoginReg } from './type'

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
  // select: (params: Login) => {
  //   return http.get('/user/select', params)
  // },
  // updateByPassword: (params: Login) => {
  //   return http.put('/user/updateByPassword', params)
  // },
  // updateByUsername: (params: Login) => {
  //   return http.put('/user/updateByUsername', params)
  // },
  
  /**
   * @desc 标签接口
   */
  // insertTag: (params: Login) => {
  //   return http.post('/label/insert', params)
  // },
  // deleteTag: (params: Login) => {
  //   return http.delete('/label/delete', params)
  // },
  // updateTag: (params: Login) => {
  //   return http.put('/label/update', params)
  // },
  // selectTag: (params: Login) => {
  //   return http.get('/label/select', params)
  // },

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
