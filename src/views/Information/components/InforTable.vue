<template>
	<div class="tableContainer" ref="tableContainer">
    <el-table :data="tableData" stripe style="width: 100%;height: 100%;" :scrollbar-always-on="true">
      <el-table-column v-for="item, index in tableEmployee" :key="item.value" :prop="index" :width="item.width" :label="item.label" sortable/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editCurrentEmployee(scope.row)">
            编辑</el-button
          >
          <el-popconfirm
							title="你确定要删除当前用户吗?"
							width="220"
							@confirm="deleteIndexUser(scope.row)"
						>
							<template #reference>
								<el-button link type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>

<script lang="ts" setup>
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import {  ref, toRaw } from 'vue'
import { Employee } from '@/api/type'
import api from '@/api/api'
import { ElMessage } from 'element-plus'

const EmployeeStore = useEmployeeStore()
const { EmployeeList:tableData,dialogFixFormVisible,form2 } = storeToRefs(EmployeeStore)

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

const editCurrentEmployee = async (row: Employee) => {
	const data = toRaw(row)
	dialogFixFormVisible.value = true
	form2.value = data
	console.log(row)
}

/**
 * Deletes the user at the specified index.
 *
 * @param {performanceRow} row - The row containing the user data.
 * @return {Promise<void>} - A promise that resolves when the user is deleted.
 */
const deleteIndexUser = async (row: Employee) => {
	const deleteData = toRaw(row)
  
	const res = await api.deleteEmployee(Number(deleteData.id))
	if (res.data.state === 200) {
		EmployeeStore.refreshEmployeeList()
		ElMessage.success('删除成功')
	} else {
		ElMessage.error(res.data.message)
	}
}
</script>

<style lang="scss">
.tableContainer {
	height: 79vh;
	width: 82.7vw;

	.el-table-v2 {
		height: 100%;
	}
}
</style>
