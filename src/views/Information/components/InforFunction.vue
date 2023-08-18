<template>
	<div class="information-function">
    <el-select v-model="currentDate" class="m-2" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
		<div class="function-selectSearch">
			<div class="mt-4">
				<el-input
					v-model="search"
					placeholder="请输入员工编号或姓名"
					class="input-with-select"
				>
					<template #prepend>
						<el-select
							:placeholder="defaultSelect == '' ? '选择岗位' : defaultSelect"
							style="width: 115px"
						>
							<el-option
								v-for="item of select"
								@click="taggleSelect(item)"
								:label="item"
								:key="item"
								value="1"
							/>
						</el-select>
					</template>
					<template #append>
						<el-button :icon="Search" @click="searchEmployee" />
					</template>
				</el-input>
			</div>
		</div>
		<div class="function-button">
			<el-button
				class="funtion-button-item"
				@click="dialogCreateFormVisible = true"
				type="default"
				text
			>
				<el-icon><DocumentAdd /></el-icon>
				<p>新建</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogFixFormVisible = true"
				type="default"
				text
			>
				<el-icon><Edit /></el-icon>
				<p>修改</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogInFormVisible = true"
				type="default"
				text
			>
				<el-icon><Upload /></el-icon>
				<p>导入</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogOutFormVisible = true"
				type="default"
				text
			>
				<el-icon><Download /></el-icon>
				<p>导出</p>
			</el-button>
		</div>
	</div>
	<el-dialog v-model="dialogCreateFormVisible" title="新建">
		<el-form :model="form" :rules="formRules">
      <el-form-item v-for="field, key in formField" :key="field.label" :label="field.label" :prop="key">
        <template v-if="field.label === '创建时间'">
          <el-select v-model="form.createdTime" class="m-2" placeholder="选择创建时间">
            <el-option v-for="pastYearMonth in currentDateList" :key="pastYearMonth" :value="pastYearMonth" :label="pastYearMonth"/>
          </el-select>
        </template>
        <template v-else-if="field.label === '岗位'">
          <el-select v-model="form.post" class="m-2" placeholder="选择岗位">
            <el-option v-for="post in select" :key="post" :value="post" :label="post"/>
          </el-select>
        </template>
        <template v-else-if="field.label.startsWith('是否')">
          <el-radio-group v-model="form[key]">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </template>
        <template v-else-if="field.label === '性别'">
          <el-radio-group v-model="form[key]">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </template>
        <template v-else>     
          <el-input v-model="form[key]" autocomplete="off"></el-input>
        </template>
      </el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogCreateFormVisible = false">取消</el-button>
				<el-button type="info" @click="submitCreatedForm()">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogFixFormVisible" title="修改">
    111
	</el-dialog>
	<el-dialog v-model="dialogInFormVisible" title="导入">
    <el-upload
    class="upload-demo"
    drag
    action="http://8.134.133.19:8827/upload"
    multiple
    :before-upload="beforeAvatarUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        Please upload the xls/xlsx file
      </div>
    </template>
  </el-upload>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogInFormVisible = false">取消</el-button>
				<el-button type="info" @click="dialogInFormVisible = false">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogOutFormVisible" title="导出">123
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
import api from '@/api/api'
import { Employee } from '@/api/type'

const EmployeeStore = useEmployeeStore()
const PostStore = usePostStore()

const { createdTime: currentDate,createdTimeList: options }  = storeToRefs(EmployeeStore)
const search = ref('')
const defaultSelect = ref('')
const { postData: select } = storeToRefs(PostStore)
const dialogCreateFormVisible = ref(false)
const dialogFixFormVisible = ref(false)
const dialogInFormVisible = ref(false)
const dialogOutFormVisible = ref(false)
const currentDateList = ref<string[]>([])

const form = reactive<Employee>({})

const formField = reactive({
	createdTime: {
		value: '',
		label: '创建时间',
		type: '',
	},
	number:  {
		value: '',
		label: '员工编号',
		type: '',
	},
	name: {
		value: '',
		label: '姓名',
		type: '',
	},
	post: {
		value: '',
		label: '岗位',
		type: '',
	},
	unit: {
		value: '',
		label: '单位',
		type: '',
	},
	sex: {
		value: '',
		label: '性别',
		type: '',
	},
	status: {
		value: '',
		label: '政治面貌',
		type: '',
	},
	degree: {
		value: '',
		label: '最高学历',
		type: '',
	},
	age: {
		value: '',
		label: '年龄（周岁）',
		type: '',
	},
	seniority: {
		value: '',
		label: '烟草工作年限',
		type: '',
	},
	one: {
		value: '',
		label: '是否有体育特长',
		type: '',
	},
	two: {
		value: '',
		label: '是否有艺术特长',
		type: '',
	},
	three: {
		value: '',
		label: '是否体育类兴趣小组成员',
		type: '',
	},
	four: {
		value: '',
		label: '是否艺术类兴趣小组成员',
		type: '',
	},
	five: {
		value: '',
		label: '公文写作能力',
		type: '',
	},
	six: {
		value: '',
		label: '数据分析能力',
		type: '',
	},
	seven: {
		value: '',
		label: '新媒体营销技术水平',
		type: '',
	},
	eight: {
		value: '',
		label: '业务规章制度掌握和执行能力',
		type: '',
	},
	nine: {
		value: '',
		label: '创新能力（意识、行为和成效）',
		type: '',
	},
	ten: {
		value: '',
		label: '沟通能力',
		type: '',
	},
	eleven: {
		value: '',
		label: '营销策划及执行能力',
		type: '',
	},
	twelve: {
		value: '',
		label: '团队意识及协作能力',
		type: '',
	},
	thirteen: {
		value: '',
		label: '是否中级或以上经济师',
		type: '',
	},
	fourteen: {
		value: '',
		label: '是否初级经济师',
		type: '',
	},
	fifteen: {
		value: '',
		label: '是否二级烟草制品购销职业资格',
		type: '',
	},
	sixteen: {
		value: '',
		label: '是否三级烟草制品购销职业资格',
		type: '',
	},
	seventeen: {
		value: '',
		label: '是否四级烟草制品购销职业资格',
		type: '',
	},
	eighteen: {
		value: '',
		label: '是否五级烟草制品购销职业资格',
		type: '',
	},
	nineteen: {
		value: '',
		label: '是否具有中级以上计算机方面的资格证书',
		type: '',
	},
	twenty: {
		value: '',
		label: '是否有参加市局组织的新媒体培训经历',
		type: '',
	},
	twentyOne: {
		value: '',
		label: '是否有参加市局组织的数据分析培训经历',
		type: '',
	},
	twentyTwo: {
		value: '',
		label: '是否有市局轮训经历',
		type: '',
	},
	twentyThree: {
		value: '',
		label: '是否有省局轮训经历',
		type: '',
	},
	twentyFour: {
		value: '',
		label: '是否省级内训师',
		type: '',
	},
	twentyFive: {
		value: '',
		label: '是否市级或县级内训师',
		type: '',
	},
	twentySix: {
		value: '',
		label: '近两年是否有参与线下授课经历',
		type: '',
	},
	twentySeven: {
		value: '',
		label: '近两年是否有参与内训师相关竞赛的经历',
		type: '',
	},
	twentyEight: {
		value: '',
		label: '近两年是否有参加视频课程开发经历',
		type: '',
	},
	twentyNine: {
		value: '',
		label: '是否数据分析团队成员',
		type: '',
	},
	thirty: {
		value: '',
		label: '是否新媒体营销团队成员',
		type: '',
	},
	thirtyOne: {
		value: '',
		label: '是否省局劳模工作室成员',
		type: '',
	},
	thirtyTwo: {
		value: '',
		label: '是否省局创客工作室成员',
		type: '',
	},
	thirtyThree: {
		value: '',
		label: '是否有参加省局专项工作的经历',
		type: '',
	},
	thirtyFour: {
		value: '',
		label: '当地主要使用的方言掌握情况',
		type: '',
	},
	thirtyFive: {
		value: '',
		label: '普通话标准情况',
		type: '',
	},
	thirtySix: {
		value: '',
		label: '粤语掌握情况',
		type: '',
	},
	thirtySeven: {
		value: '',
		label: '参加工作前是否已定居广东',
		type: '',
	},
	thirtyEight: {
		value: '',
		label: '参加工作前是否已定居韶关',
		type: '',
	},
	thirtyNine: {
		value: '',
		label: '是否在工作地（区/县/市）定居',
		type: '',
	},
	forty: {
		value: '',
		label: '是否有任职营销以外岗位的工作经历',
		type: '',
	},
	fortyOne: {
		value: '',
		label: '是否有任职当前岗位以外营销岗位的工作经历',
		type: '',
	},
	fortyTwo: {
		value: '',
		label: '是否已婚',
		type: '',
	},
	fortyThree: {
		value: '',
		label: '生育情况',
		type: '',
	},
	fortyFour: {
		value: '',
		label: '是否有QC项目获奖情况',
		type: '',
	},
	fortyFive: {
		value: '',
		label: '是否有论文发表或获奖情况',
		type: '',
	},
	fortySix: {
		value: '',
		label: '是否有文章在省局以上媒体发表情况',
		type: '',
	},
	fortySeven: {
		value: '',
		label: '是否有参与数字化转型项目情况',
		type: '',
	},
	fortyEight: {
		value: '',
		label: '是否有作为主要成员参加营销创新项目的经历',
		type: '',
	},
	fortyNine: {
		value: '',
		label: '是否有参与的视频项目并在省局以上媒体发表情况',
		type: '',
	},
	fifty: {
		value: '',
		label: '是否有参与市局营销竞赛并获奖的情况',
		type: '',
	},
	fiftyOne: {
		value: '',
		label: '是否受到国家局（总公司）表彰',
		type: '',
	},
	fiftyTwo: {
		value: '',
		label: '是否受到省局（公司）表彰',
		type: '',
	},
	fiftyThree: {
		value: '',
		label: '是否受到市局（公司）表彰',
		type: '',
	}
})

const formRules = reactive({
	createdTime: {
		required: true,
		message: '请选择创建时间',
		trigger: 'change'
	},
	name: {
		required: true,
		message: '请输入姓名',
		trigger: 'blur'
	},
	number: {
		required: true,
		message: '请输入员工编号',
		trigger: 'blur'
	},
	post: {
		required: true,
		message: '请选择岗位',
		trigger: 'blur'
	},
})

watchEffect(() => {
	currentDateList.value = (() => {
		// 获取当前日期
		const currentDate = new Date();

		// 获取当前年份和月份
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1; // 月份从0开始，所以需要加1

		// 生成过去一年的年月数组
		const pastYearMonths = [];
		for (let i = 0; i < 12; i++) {
			let year = currentYear;
			let month = currentMonth - i;

			if (month <= 0) {
				// 如果月份小于等于0，表示跨年了
				year -= 1;
				month += 12;
			}

			// 将年份和月份格式化为字符串，并添加到数组中
			const formattedMonth = month.toString().padStart(2, '0'); // 月份补零
			pastYearMonths.push(`${year}-${formattedMonth}`);
		}
		return pastYearMonths
	})()
})
/**
 * @param: 当前点击岗位对象
 * @desc: 切换当前下拉菜单显示
 */
const taggleSelect = (select: string) => {
	defaultSelect.value = select
}

/**
 * Validates the file extension before uploading the avatar.
 *
 * @param {any} file - The file object to be validated.
 * @return {boolean} - Returns true if the file extension is either 'xls' or 'xlsx', otherwise returns false.
 */
const beforeAvatarUpload = (file: any): boolean=> {
	var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
	const extension = testmsg === 'xls'
	const extension2 = testmsg === 'xlsx'

	if(!extension && !extension2) {
		ElMessage.error('请上传xls/xlsx格式的文件！');
		return false;
	}
	// return isJPG && isLt2M;
	return (extension || extension2)
}
const searchEmployee = async () => {
	const res = await api.findByPostAndCondition({ post: defaultSelect.value,conditions: search.value })
	if(res.data.state === 200) {
		EmployeeStore.updateEmployeeList(res.data.data)
		console.log(res.data.data)
		const { EmployeeList }  = storeToRefs(EmployeeStore)
		console.log(EmployeeList.value);   
		ElMessage.success('查询成功!')
	}
}

const submitCreatedForm = async () => {
	dialogCreateFormVisible.value = false
	const res = await api.insertEmployee(form)
	if(res.data.state === 200) {
		EmployeeStore.addEmployeeList(res.data.data)
		console.log(res.data.data);
    
	}
}
</script>

<style lang="scss" scoped>
.information-function {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 0 0.5vw;
	.function-selectSearch {
		width: 30vw;
		overflow: hidden;
		border-radius: 5px;
		text-align: center;
		margin: 0 2vw;

		.input-with-select .el-input-group__prepend {
			background-color: var(--el-fill-color-blank);
		}
	}
	.function-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 4.8vh;
		width: 22vw;
		.el-button {
			width: 5vw;
			p {
				padding-left: 4px;
			}
		}
	}
}
</style>
