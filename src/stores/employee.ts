/* eslint-disable indent */
import { ref } from 'vue'
import { defineStore } from 'pinia'

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

export const useEmployeeStore = defineStore('employee', () => {
	const createdTime = ref<string>('')
	const createdTimeList = ref<Array<string>>([])
  const EmployeeList = ref<Array<string>>([])
  const EmployeeCloumn = ref<string[]>(['员工编号','姓名','单位','岗位','性别',
  '政治面貌','最高学历','年龄（周岁）','烟草工作年限','是否有体育特长','是否有艺术特长',
  '是否体育类兴趣小组成员','是否艺术类兴趣小组成员','公文写作能力','数据分析能力',
  '新媒体营销技术水平','业务规章制度掌握和执行能力','创新能力（意识、行为和成效）',
  '沟通能力','营销策划及执行能力','团队意识及协作能力',
  '是否中级或以上经济师','是否初级经济师','是否二级烟草制品购销职业资格',
  '是否三级烟草制品购销职业资格','是否四级烟草制品购销职业资格',
  '是否五级烟草制品购销职业资格','是否具有中级以上计算机方面的资格证书',
  '是否有参加市局组织的新媒体培训经历','是否有参加市局组织的数据分析培训经历',
  '是否有市局轮训经历','是否有省局轮训经历','是否省级内训师','是否市级或县级内训师',
  '近两年是否有参与线下授课经历','近两年是否有参与内训师相关竞赛的经历',
  '近两年是否有参加视频课程开发经历','是否数据分析团队成员','是否新媒体营销团队成员',
  '是否省局劳模工作室成员','是否省局创客工作室成员','是否有参加省局专项工作的经历',
  '当地主要使用的方言掌握情况','普通话标准情况','粤语掌握情况','参加工作前是否已定居广东',
  '参加工作前是否已定居韶关','是否在工作地（区/县/市）定居','是否有任职营销以外岗位的工作经历',
  '是否有任职当前岗位以外营销岗位的工作经历','是否已婚','生育情况','是否有QC项目获奖情况',
  '是否有论文发表或获奖情况','是否有文章在省局以上媒体发表情况','是否有参与数字化转型项目情况',
  '是否有作为主要成员参加营销创新项目的经历','是否有参与的视频项目并在省局以上媒体发表情况',
  '是否有参与市局营销竞赛并获奖的情况','是否受到国家局（总公司）表彰','是否受到省局（公司）表彰',
  '是否受到市局（公司）表彰','创建时间'])

  // 画像信息
  const currentEmployee = ref<string>('')
  const currentEmployeeInfos = ref<EmployeeInfos>()
  const portraitFeature = ref<Array<any>>([])
  
  // 画像侧边栏
  const EmployeeNameList = ref<Array<EmployeeName>>([])
  const pageNumber = ref<number>()

  function updateCurrentEmployee(payload: string) {
		currentEmployee.value = payload
	}

  function updateCurrentEmployeeInfos(payload: EmployeeInfos) {
		currentEmployeeInfos.value = payload
	}

  function updatePortraitFeature(payload: Array<any>) {
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

	return { 
		createdTime,
		createdTimeList,
    EmployeeList,
    currentEmployee,
    EmployeeNameList,
    pageNumber,
    EmployeeCloumn,
    portraitFeature,
    currentEmployeeInfos,
    addEmployeeList,
    updateCreatedTimeList,
    updateEmployeeList,
    updateEmployeeNameList,
    updatePortraitFeature,
    updatePageNumber,
    updateCurrentEmployee,
    updateCurrentEmployeeInfos
  }
},{
  persist: {
    paths: ['createdTime']
  }
})
