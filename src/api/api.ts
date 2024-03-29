import http from '../util/http'
import { Performance, AnalyzeRelation, Employee, LoginReg, OverallPortrait, Search, SelectAllEmployee, Tag, fixPassword, fixUsername, updatePassword, controlModel, findModel } from './type'

export default {
	/**
	 * @desc 用户接口
	 */
	login: (params: LoginReg) => {
		// 用户登入方法，只需要传入用户名和密码
		return http.get('/user/login', params)
	},
	register: (params: LoginReg) => {
		// 用户注册方法,只需要传入用户名和密码
		return http.post('/user/reg', params)
	},
	deleteUser: (params: number) => {
		// 用户信息删除方法，需要传入id
		return http.delete('/user/delete?id=' + params)
	},
	selectUser: () => {
		// 用户展示方法，不需要传入参数
		return http.get('/user/select')
	},
	updateByPassword: (params: fixPassword) => {
		// 修改密码方法，需要传入id和密码
		return http.get('/user/updateByPassword', params)
	},
	updateByUsername: (params: fixUsername) => {
		// 修改用户名方法需要传入id和用户名
		return http.get('/user/updateByUsername', params)
	},
	updatePassword: (params: updatePassword) => {
		// 修改用户名方法需要传入id和用户名
		return http.get('/user/updatePassword', params)
	},

	/**
	 * @desc 标签接口
	 */
	insertTag: (params: { features: string }) => {
		// 标签信息新建方法，需要传入标签信息
		return http.post('/label/insert', params)
	},
	deleteTag: (params: number) => {
		// 标签信息删除方法，需要传入id
		return http.delete('/label/delete?id=' + params)
	},
	updateTag: (params: Tag) => {
		// 标签信息修改方法，需要传入id和标签信息
		return http.put('/label/update', params)
	},
	selectTag: () => {
		// 标签信息查询方法
		return http.get('/label/select')
	},

	/**
	 * @desc 员工接口
	 */
	cockpit: (params: {createdTime: string,post: string}) => {
		// 员工信息新建方法，员工编号number是必须的，为保证能根据number查询该记录
		return http.get('/employee/cockpit', params)
	},
	insertEmployee: (params: Employee) => {
		// 员工信息新建方法，员工编号number是必须的，为保证能根据number查询该记录
		return http.post('/employee/insert', params)
	},
	deleteEmployee: (params: number) => {
		// 员工信息删除方法，需传入员工信息id
		return http.delete('/employee/delete?id='+params)
	},
	updateEmployee: (params: Employee) => {
		// 员工信息修改方法，必须传入id
		return http.put('/employee/update', params)
	},
	findByPostAndCondition: (params: Search) => {
		// 员工信息修改方法，必须传入id
		return http.get('/employee/findByPostAndCondition', params)
	},
	selectEmployee: (params: { createdTime: string }) => {
		// 员工信息查询方法，用于展示员工信息，必须传入日期，格式如 “2023-05”
		return http.get('/employee/select', params)
	},
	selectAllEmployee: (params: SelectAllEmployee) => {
		// 员工信息查询方法，有分页功能，pageNum：当前页码，pageSize：每页展示条数，必须传入的字段为pageNum，pageSize,createdTime,createdTime为字符串形式，注意格式如 “2023-05”
		return http.get('/employee/selectAll', params)
	},
	findEmployeeByNumber: (params: { name: string}) => {
		// 员工信息查询方法，根据员工姓名查询，用于表单的快速填写
		return http.get('/employee/findByNumber', params)
	},
	findEmployeeByName: (params: Employee) => {
		// 员工信息查询方法，获取员工匹配系数需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/findFactorByname', params)
	},
	findByPostAndCreatedTime: (params: AnalyzeRelation) => {
		// 表单用，传入日期和岗位，
		return http.get('/employee/findByPostAndCreatedTime5', params)
	},
	getEmployeeMessage: (params: Employee) => {
		// 根据日期和姓名查询员工信息,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/EmployeeMessage', params)
	},
	getEmployeeAndPostMatching: (params: Employee) => {
		// 人岗匹配分析，查询该员工对该岗位的匹配系数，以及该岗位的最高最低平均匹配系数,需要传入的参数有员工姓名和日期、岗位，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/EmployeeAndPostMatching', params)
	},
	getCreatedTime: () => {
		// 查询员工信息所有月份的方法
		return http.get('/employee/selectByCreatedTime')
	},
	getPostCountFactorByName: (params: { createdTime: string, name: string }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostCountFactorByName',params)
	},
	getPostCountFactorByNumber: (params: { createdTime: string, number: number }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostCountFactorByNumber',params)
	},
	getPostFeatures: (params: { createdTime: string, number: number }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostFeatures',params)
	},
	getPostFeaturesByName: (params: { createdTime: string, name: string }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostFeaturesByName',params)
	},
	getPostFeaturesByNumberAndPost: (params: { createdTime: string, number: number,post:string }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostFeaturesByNumberAndPost',params)
	},
	selectByUnit: () => {
		// 查询员工信息所有单位的方法
		return http.get('/employee/selectByUnit')
	},
	uploadEmployee: (params: { filename : File }) => {
		// 查询员工信息所有单位的方法
		return http.post('/employee/upload',params)
	},
	downloadEmployeeExcel: () => {
		// 查询员工信息所有单位的方法
		return http.get('/employee/downloadexcel')
	},
	getEmployeeNiceFeatures: (params: { createdTime: string, number: number }) => {
		// 查询员工信息所有单位的方法
		return http.get('/employee/EmployeeNiceFeatures',params)
	},
	getEmployeeAndPostSuit: (params: { createdTime: string, post: string }) => {
		// 查询员工信息所有单位的方法
		return http.get('/employee/EmployeeAndPostSuit',params)
	},
	findByCreatedTimeAndCondition: (params: { createdTime: string, conditions: string, pageNum: number, pageSize: number }) => {
		// 查询员工信息所有单位的方法
		return http.get('/employee/findByCreatedTimeAndCondition',params)
	},
	getVerifyCode: () => {
		// 查询员工信息所有单位的方法
		return http.get('/verifyCode')
	},
	PostFeatures1: (params: { createdTime: string, number: number }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostFeatures1', params)
	},
	PostFeaturesByNumberAndPost1: (params: { createdTime: string, number: number, post: string }) => {
		// 查出画像特征,也就是员工拥有的优秀特征,需要传入的参数有员工姓名和日期，类型都是string，日期格式例如”2023-05“
		return http.get('/employee/PostFeaturesByNumberAndPost1', params)
	},

	/**
	 * @desc 绩效接口
	 */
	insertPerformane: (params: Performance) => {
		// 员工绩效新增方法，除factor和employee字段其他都不能为空，填入员工编号或员工姓名时会自动填入其他信息，不能自己更改,为方便前端更新数据，新增成功后自动返回新增的数据
		return http.post('/performane/insert', params)
	},
	deletePerformane: (params: Employee) => {
		// 员工绩效删除方法
		return http.get('/performane/deleteById', params)
	},
	findByUnit: (params: Employee) => {
		// 用于右上角的查询，根据岗位进行查询
		return http.get('/performane/findByUnit', params)
	},
	overallPortrait: (params: OverallPortrait) => {
		// 用于总体画像页面，各岗位人数以及匹配系数,需要传入的参数有日期类型都是string，日期格式例如”2023-05“
		return http.get('/performane/overallPortrait', params)
	},
	updatePerformane: (params: Performance) => {
		// 修改员工绩效的方法 要求前端表单能修改的字段只有绩效,为方便前端更新数据，新增成功后自动返回新增的数据
		return http.put('/performane/update', params)
	},
	selectPerformane: () => {
		//  员工绩效查询方法,查询所有数据,用于前端展示
		return http.get('/performane/select')
	},
	findPostFactorDesc: (params: AnalyzeRelation) => {
		//  根据岗位和日期查询该岗位匹配系数，按降序排序,需要传入的参数有日期、岗位，类型都是string，日期格式例如”2023-05“
		return http.get('/performane/findPostFactorDesc', params)
	},
	dataAnalysis1: (params: { createdTime: string }) => {
		//  用于数据分析页面，获取员工数，岗位数，总体匹配系数，平均年龄,需要传入的参数有日期,类型都是string，日期格式例如”2023-05“
		return http.get('/performane/dataAnalysis1', params)
	},
	dataAnalysis2: (params: Employee) => {
		//  用于数据分析页面，各岗位人数以及匹配系数,需要传入的参数有日期类型都是string，日期格式例如”2023-05“
		return http.get('/performane/dataAnalysis2', params)
	},
	findByName: (params: { name: string}) => {
		//  员工绩效根据员工姓名查询方法，用于快速填写表单
		return http.get('/performane/findByName', params)
	},
	findByNameAndCreatedTime: (params: Employee) => {
		//  员工绩效根据员工姓名和日期查询方法，用于快速填写表单
		return http.get('/performane//performane/findByNameAndCreatedTimeNew', params)
	},
	findByNumber: (params: Employee) => {
		//  员工绩效根据员工编号查询方法，用于快速填写表单
		return http.get('/performane/findByNumber', params)
	},
	selectFindCreatedTime: () => {
		//  员工绩效根据员工编号查询方法，用于快速填写表单
		return http.get('/performane/selectFindCreatedTime')
	},
	findPerByPostAndCondition: (params: Search) => {
		//  用于右上角的查询，根据岗位和员工编号或岗位和员工姓名进行查询，注意编号和姓名的数据类型是不一样的，会根据传入的数据自动判断是姓名还是编号
		return http.get('/performane/findByPostAndCondition', params)
	},
	findByNumberAndCreatedTime: (params: { createdTime: string, number: number }) => {
		//  用于右上角的查询，根据岗位和员工编号或岗位和员工姓名进行查询，注意编号和姓名的数据类型是不一样的，会根据传入的数据自动判断是姓名还是编号
		return http.get('/performane/findByNumberAndCreatedTime', params)
	},
	selectByCreatedTime: (params: { createdTime: string }) => {
		//  员工绩效查询方法,根据月份查询,用于前端展示
		return http.get('/performane/selectByCreatedTime', params)
	},

	/**
	 * @desc 人岗匹配分析接口
	 */
	searchLabel: (params: string) => {
		//  标签信息过滤方法，需要传入要求信息
		return http.get('/Tdetails/searchLabel/'+ params)
	},
	searchemployee: (params: Array<string>) => {
		//  标签信息过滤方法，需要传入要求信息
		return http.post('/Tdetails/searchemployee', params)
	},

	/**
	 * @desc 模型接口
	 */
	chooseModel: (params:  { filePath: string }) => {
		//  选择模型
		return http.post('/config/choose?filePath='+params.filePath)
	},
	selectModels: () => {
		//  搜索全部模型
		return http.get('/config/select')
	},
	insertModel: (params: controlModel) => {
		//  新增模型
		return http.post('/config/insert?filePath='+params.filePath, params.request)
	},
	deleteModel: (params: { fileName: string }) => {
		//  删除模型
		return http.get('/config/delete', params)
	},
	selectModelInformation: (params: findModel) => {
		//  搜索模型的信息
		return http.get('/config/findBYRequest', params)
	},
	findByModelProperties: () => {
		//  搜索模型的信息
		return http.get('/config/findByModelProperties')
	},

	/**
   * @desc 登记审批
   */
	selectApproval: () => {
		//  标签信息查询方法
		return http.get('/approval/select')
	},
	updateByIdNo: (params: { id: string }) => {
		//  修改状态为已驳回
		return http.put('/approval/updateByIdNo?id='+params.id)
	},
	updateByIdYes: (params: { id: string }) => {
		//  执行审批请求操作，并修改状态为已同意
		return http.put('/approval/updateByIdYes?id='+params.id)
	},

}
