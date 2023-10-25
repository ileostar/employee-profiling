import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'
import { Employee } from '@/api/type'

export type EmployeeName = {
  id: number
  name: string
  number: number
}

export type EmployeeInfos = {
  id: number
  name: string
  unit: string
  post: string
  createdTime: string
}

type postTagEmployeeInfo = {
  'id': number
  'postGoodFeaturesMessage': Array<string>
  'employeeGoodFeaturesMessage':  Array<string|null>
  'employeeBadFeaturesMessage':  Array<string|null>
}

export type postCountFactor = {
  id: number
  post: string
  factor: number
  max: number
  min: number
  avg: number
}

export type PortraitFeatureTwo = {
  postGoodFeaturesMessage: string
  employeeGoodFeaturesMessage: string
  employeeBadFeaturesMessage: string
}

export const useEmployeeStore = defineStore('employee', () => {
	const createdTime = ref<string>('')
	const createdTimeList = ref<Array<string>>([])
	const EmployeeList = ref<Array<string>>([])

	// 员工信息
	const dialogFixFormVisible = ref(false)
	const form2 = ref<Employee>({})
	const tableEmployee = ref({
		id: { 
			value: '',
			label: '序号',
			width: '90'
		},
		number: { 
			value: '',
			label: '员工编号',
			width: '90'
		},
		name: { 
			value: '',
			label:'姓名',
			width: '90'
		},
		unit: { 
			value: '',
			label:'单位',
			width: '90'
		},
		post: { 
			value: '',
			label:'岗位',
			width: '90'
		},
		sex: { 
			value: '',
			label:'性别',
			width: '90'
		},
		status: { 
			value: '',
			label:'政治面貌',
			width: '90'
		},
		degree: { 
			value: '',
			label:'最高学历',
			width: '90'
		},
		age: { 
			value: '',
			label:'年龄（周岁）',
			width: '90'
		},
		seniority: { 
			value: '',
			label:'烟草工作年限',
			width: '100'
		},
		one: { 
			value: '',
			label:'是否有体育特长',
			width: '120'
		},
		two: { 
			value: '',
			label:'是否有艺术特长',
			width: '120'
		},
		three: { 
			value: '',
			label:'是否体育类兴趣小组成员',
			width: '140'
		},
		four: { 
			value: '',
			label:'是否艺术类兴趣小组成员',
			width: '140'
		},
		five: { 
			value: '',
			label: '是否艺术类兴趣小组成员',
			width: '140'
		},
		six: { 
			value: '',
			label: '数据分析能力',
			width: '120'
		},
		seven: { 
			value: '',
			label: '新媒体营销技术水平',
			width: '120'
		},
		eight: { 
			value: '',
			label: '业务规章制度掌握和执行能力',
			width: '150'
		},
		nine: { 
			value: '',
			label:'创新能力（意识、行为和成效）',
			width: '150'
		},
		ten: { 
			value: '',
			label:'沟通能力',
			width: '100'
		},
		eleven: { 
			value: '',
			label: '营销策划及执行能力',
			width: '120'
		},
		twelve: { 
			value: '',
			label: '团队意识及协作能力',
			width: '120'
		},
		thirteen: { 
			value: '',
			label: '是否中级或以上经济师',
			width: '130'
		},
		fourteen: { 
			value: '',
			label: '是否初级经济师',
			width: '100'
		},
		fifteen: { 
			value: '',
			label: '是否二级烟草制品购销职业资格',
			width: '160'
		},
		sixteen: { 
			value: '',
			label: '是否三级烟草制品购销职业资格',
			width: '160'
		},
		seventeen: { 
			value: '',
			label: '是否四级烟草制品购销职业资格',
			width: '160'
		},
		eighteen: { 
			value: '',
			label: '是否五级烟草制品购销职业资格',
			width: '160'
		},
		nineteen: { 
			value: '',
			label: '是否具有中级以上计算机方面的资格证书',
			width: '160'
		},
		twenty: { 
			value: '',
			label: '是否有参加市局组织的新媒体培训经历',
			width: '160'
		},
		twentyOne: { 
			value: '',
			label: '是否有参加市局组织的数据分析培训经历',
			width: '160'
		},
		twentyTwo: { 
			value: '',
			label: '是否有市局轮训经历',
			width: '130'
		},
		twentyThree: { 
			value: '',
			label: '是否有省局轮训经历',
			width: '130'
		},
		twentyFour: { 
			value: '',
			label: '是否省级内训师',
			width: '130'
		},
		twentyFive: { 
			value: '',
			label: '是否市级或县级内训师',
			width: '120'
		},
		twentySix: { 
			value: '',
			label: '近两年是否有参与线下授课经历',
			width: '150'
		},
		twentySeven: { 
			value: '',
			label: '近两年是否有参与内训师相关竞赛的经历',
			width: '160'
		},
		twentyEight: { 
			value: '',
			label: '近两年是否有参加视频课程开发经历',
			width: '160'
		},
		twentyNine: { 
			value: '',
			label: '是否数据分析团队成员',
			width: '120'
		},
		thirty: { 
			value: '',
			label: '是否新媒体营销团队成员',
			width: '120'
		},
		thirtyOne: { 
			value: '',
			label: '是否省局劳模工作室成员',
			width: '120'
		},
		thirtyTwo: { 
			value: '',
			label: '是否省局创客工作室成员',
			width: '130'
		},
		thirtyThree: { 
			value: '',
			label: '是否有参加省局专项工作的经历',
			width: '150'
		},
		thirtyFour: { 
			value: '',
			label: '当地主要使用的方言掌握情况',
			width: '150'
		},
		thirtyFive: { 
			value: '',
			label: '普通话标准情况',
			width: '120'
		},
		thirtySix: { 
			value: '',
			label: '粤语掌握情况',
			width: '110'
		},
		thirtySeven: { 
			value: '',
			label: '参加工作前是否已定居广东',
			width: '150'
		},
		thirtyEight: { 
			value: '',
			label: '参加工作前是否已定居韶关',
			width: '150'
		},
		thirtyNine: { 
			value: '',
			label: '是否在工作地（区/县/市）定居',
			width: '150'
		},
		forty: { 
			value: '',
			label: '是否有任职营销以外岗位的工作经历',
			width: '160'
		},
		fortyOne: { 
			value: '',
			label: '是否有任职当前岗位以外营销岗位的工作经历',
			width: '170'
		},
		fortyTwo: { 
			value: '',
			label: '是否已婚',
			width: '110'
		},
		fortyThree: { 
			value: '',
			label: '生育情况',
			width: '110'
		},
		fortyFour: { 
			value: '',
			label: '是否有QC项目获奖情况',
			width: '130'
		},
		fortyFive: { 
			value: '',
			label: '是否有论文发表或获奖情况',
			width: '140'
		},
		fortySix: { 
			value: '',
			label: '是否有文章在省局以上媒体发表情况',
			width: '150'
		},
		fortySeven: { 
			value: '',
			label: '是否有参与数字化转型项目情况',
			width: '150'
		},
		fortyEight: { 
			value: '',
			label: '是否有作为主要成员参加营销创新项目的经历',
			width: '160'
		},
		fortyNine: { 
			value: '',
			label: '是否有参与的视频项目并在省局以上媒体发表情况',
			width: '160'
		},
		fifty: { 
			value: '',
			label: '是否有参与市局营销竞赛并获奖的情况',
			width: '160'
		},
		fiftyOne: { 
			value: '',
			label: '是否受到国家局（总公司）表彰',
			width: '150'
		},
		fiftyTwo: { 
			value: '',
			label:'是否受到省局（公司）表彰',
			width: '150'
		},
		fiftyThree: { 
			value: '',
			label:'是否受到市局（公司）表彰',
			width: '150'
		},
		createdTime:{ 
			value: '',
			label:'创建时间',
			width: '110'
		} 
	})

	// 画像信息
	const currentEmployee = ref<string>('')
	const currentEmployeeInfos = ref<EmployeeInfos>()
	const portraitFeature = ref<Employee>({})
	const tagEmployeeInfo = ref<Array<string>>([])
	const postTagEmployeeInfos = ref<postTagEmployeeInfo>()
	const postCountFactors = ref<Array<postCountFactor>>([]) // 处理过的数据
	const portraitFeatureTwo = ref<Array<PortraitFeatureTwo>>([])
  
	// 画像侧边栏
	const EmployeeNameList = ref<Array<EmployeeName>>([])
	const pageNumber = ref<number>()

	function updateCurrentEmployee(payload: string) {
		currentEmployee.value = payload
	}

	function updateCurrentEmployeeInfos(payload: EmployeeInfos) {
		currentEmployeeInfos.value = payload
	}

	function updatePortraitFeature(payload: Employee) {
		portraitFeature.value = payload
	}

	function updatePageNumber(payload: number) {
		pageNumber.value = payload
	}

	function updateCreatedTimeList(payload: Array<string>) {
		createdTimeList.value = payload
		createdTime.value = payload[0]
	}

	function addEmployeeList(payload: any){
		EmployeeList.value.push(payload)
	}

	function updateEmployeeList(payload: any) {
		EmployeeList.value = payload
	}

	function updateEmployeeNameList(payload: any) {
		EmployeeNameList.value = payload
	}

	function updateTagEmployeeInfo(payload: Array<string>) {
		tagEmployeeInfo.value = payload
	}

	function updatePostCountFactors(payload: Array<postCountFactor>){
		postCountFactors.value = payload
	}

	const refreshEmployeeList = async () => {
		const res = await api.selectEmployee({createdTime: createdTime.value})
		if(res.data.state===200) {
			updateEmployeeList(res.data.data)
		}
	}

	const updatePostTagEmployeeInfo = (payload: any) => {
		postTagEmployeeInfos.value = payload
	}

	const ToggleEmployee = async (employeeNumber : number) => {
		const req = {createdTime: createdTime.value,number: employeeNumber}
		// 查询当前员工信息
		const res1 = await api.getEmployeeMessage(req)
		if(res1.data.state === 200) { 
			updatePortraitFeature(res1.data.data)
		}
		const res2 = await api.getPostFeatures(req)
		if(res2.data.state === 200) { 
			updateCurrentEmployeeInfos(res2.data.data)
		}
		const res3 = await api.getEmployeeNiceFeatures(req)
		if(res3.data.state === 200) { 
			updateTagEmployeeInfo(res3.data.data)
		}

		const res4 = await api.getPostFeatures({...req})
		if(res4.data.state === 200) { 
			updatePostTagEmployeeInfo(res4.data.data)
		}

		const res5 = await api.getPostCountFactorByNumber(req)
		if(res5.data.state === 200) {
			const handleRes5 = res5.data.data.map((item:postCountFactor) => {
				const {post,factor,max,min,avg} = item
				return {
					post,
					factor: Number(factor).toFixed(2),
					max: Number(max).toFixed(2),
					min: Number(min).toFixed(2),
					avg: Number(avg).toFixed(2)  
				}
			})
			updatePostCountFactors(handleRes5)
		}

		const res6 = await api.PostFeatures1(req)
		if(res6.data.state === 200 ) {
			portraitFeatureTwo.value = res6.data.data
		}
	}

	return { 
		createdTime,
		createdTimeList,
		EmployeeList,
		currentEmployee,
		EmployeeNameList,
		pageNumber,
		portraitFeature,
		currentEmployeeInfos,
		dialogFixFormVisible,
		form2,
		tagEmployeeInfo,
		postTagEmployeeInfos,
		postCountFactors,
		tableEmployee,
		portraitFeatureTwo,
		addEmployeeList,
		updateCreatedTimeList,
		updateEmployeeList,
		updateEmployeeNameList,
		updatePortraitFeature,
		updatePageNumber,
		updateCurrentEmployee,
		updateCurrentEmployeeInfos,
		refreshEmployeeList,
		updateTagEmployeeInfo,
		ToggleEmployee
	}
},{
	persist: {
		paths: ['createdTime']
	}
})
