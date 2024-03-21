<template>
	<div class="performance-function">
    <el-select v-model="createdTime" class="m-2" placeholder="Select" @change="changeCreatedTime">
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
						<el-button :icon="Search" @click="searchPerformance" />
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
				@click="openEdit"
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
      <a :href="download">
        <el-button
          class="funtion-button-item"
          type="default"
          text
        >
          <el-icon><Download /></el-icon>
          <p>导出</p>
        </el-button>
      </a>
		</div>
	</div>
	<el-dialog v-model="dialogCreateFormVisible" title="新建绩效成绩">
		<el-form :model="form" :rules="formRules" ref="ruleFormRef" label-position="top" label-width="130px">
      <el-row>
        <el-col v-for="field, key in formField" :key="field.label" :span="12">
          <el-space
            fill
            wrap
            :fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          >
            <el-form-item :label="field.label" :prop="key">
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
              <template v-else-if="field.label === '姓名'">
                <el-input v-model="form.name" @blur="autofill" autocomplete="off"></el-input>
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
          </el-space>
        </el-col>
      </el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogCreateFormVisible = false">取消</el-button>
				<el-button type="info" @click="submitCreatedForm(ruleFormRef)">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogEditFormVisible" title="修改绩效成绩">
		<el-form :model="formEdit" :rules="formEditRules" ref="ruleEditFormRef"  label-position="top" label-width="130px">
      <el-row>
        <el-col  v-for="field, key in formEditField" :key="field.label" :span="12"> 
          <el-space
            fill
            wrap
            :fill-ratio="80"
            direction="horizontal"
            style="width: 96%"
          >
          <el-form-item :label="field.label" :prop="key">
            <template v-if="field.label === '创建时间'">
              <el-select v-model="formEdit.createdTime" class="m-2" placeholder="选择创建时间">
                <el-option v-for="pastYearMonth in currentDateList" :key="pastYearMonth" :value="pastYearMonth" :label="pastYearMonth"/>
              </el-select>
            </template>
            <template v-else-if="field.label === '姓名'">
              <el-input v-model="formEdit.name" @blur="autoEditfill" autocomplete="off"></el-input>
            </template>
            <template v-else-if="field.label === '岗位'">
              <el-select v-model="formEdit.post" class="m-2" placeholder="选择岗位">
                <el-option v-for="post in select" :key="post" :value="post" :label="post"/>
              </el-select>
            </template>
            <template v-else-if="field.label.startsWith('是否')">
              <el-radio-group v-model="formEdit[key]">
                <el-radio label="是" />
                <el-radio label="否" />
              </el-radio-group>
            </template>
            <template v-else-if="field.label === '性别'">
              <el-radio-group v-model="formEdit[key]">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </template>
            <template v-else>     
              <el-input v-model="formEdit[key]" autocomplete="off"></el-input>
            </template>
          </el-form-item>
          </el-space>
        </el-col>
      </el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取消</el-button>
				<el-button type="info" @click="submitEditForm(ruleEditFormRef)">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogInFormVisible" title="导入绩效成绩">
    <a href="src/static/performance.xlsx" download style="display: block;padding-bottom: 1vh;margin-top: -2vh;color: #409eff">绩效成绩导入模版</a>
    <el-upload
    class="upload-demo"
    drag
    multiple
    :action="uploadUrl"
    :headers="{ 'Accept': '*/*' }"
    :data="{ 'Content-Type': 'multipart/form-data' }"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
    :before-upload="beforeUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖动文件到这或者 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        请上传 xls/xlsx 文件
      </div>
    </template>
    </el-upload>
	</el-dialog>
</template>

<script lang="ts" setup>
import { Performance } from '@/api/type'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'

const PostStore = usePostStore()
const EmployeeStore = useEmployeeStore()
const performanceStore = usePerformanceStore()
const { postData: select } = storeToRefs(PostStore)
const { dialogEditFormVisible,formEdit,perCurrentTime:createdTime } = storeToRefs(performanceStore)
const { createdTimeList: options } = storeToRefs(EmployeeStore)

const search = ref('')
const defaultSelect = ref('')
const currentDateList = ref<string[]>([])

const dialogCreateFormVisible = ref(false)
const dialogInFormVisible = ref(false)

const download = ref<string>('')
const params = ref<string>('')

/**
 * @param: 当前点击创建时间
 * @desc: 切换创建时间
 */
const changeCreatedTime = async (value: string) => {
	createdTime.value = value
	const res = await api.selectByCreatedTime({createdTime: value})
	if(res.data.state===200) {
		performanceStore.updatePerformanceList(res.data.data)
	}
}

// 上传路径
const uploadUrl = import.meta.env.VITE_AXIOS_BASE_URI + 'performane/upload'

// 支持导出当前页面显示内容
watchEffect(()=>{
	if(createdTime.value != ''){
		params.value = 'createdTime='+createdTime.value
	}
	if(search.value != ''){
		params.value += '&conditions='+search.value
	}
	if(defaultSelect.value != ''){
		params.value += '&post='+defaultSelect.value
	}
	download.value = import.meta.env.VITE_AXIOS_BASE_URI + 'performane/downloadexcel?'+ params.value
})

const form = ref<Performance>({})
const formField = reactive({
	name:  {
		value: '',
		label: '姓名',
		type: '',
	},
	number: {
		value: '',
		label: '员工编号',
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
	scores: {
		value: '',
		label: '月度绩效',
		type: '',
	},
	createdTime: {
		value: '',
		label: '创建时间',
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
	unit: {
		required: true,
		message: '请输入单位',
		trigger: 'blur'
	},
	scores: {
		required: true,
		message: '请输入月度绩效',
		trigger: 'blur'
	},
})
const ruleFormRef = ref<FormInstance>()

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

const formEditField = reactive({
	name:  {
		value: '',
		label: '姓名',
		type: '',
	},
	number: {
		value: '',
		label: '员工编号',
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
	scores: {
		value: '',
		label: '月度绩效',
		type: '',
	},
	createdTime: {
		value: '',
		label: '创建时间',
		type: '',
	}
})
const formEditRules = reactive({
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
	unit: {
		required: true,
		message: '请输入单位',
		trigger: 'blur'
	},
	scores: {
		required: true,
		message: '请输入月度绩效',
		trigger: 'blur'
	},
})
const ruleEditFormRef = ref<FormInstance>()


const autofill = async () => {
	const res = await api.findByName({name: form.value.name as string})
	if ( res.data.state === 200 ) {
		form.value = {
			name: form.value.name,
			...res.data.data[0]
		}
	}
}

const autoEditfill = async () => {
	const res = await api.findByName({name: formEdit.value.name as string})
	if ( res.data.state === 200 ) {
		formEdit.value = {
			name: formEdit.value.name,
			...res.data.data[0]
		}
	}
}

/**
 * @param: 当前点击岗位对象
 * @desc: 切换当前下拉菜单显示
 */
const taggleSelect = (select: string) => {
	defaultSelect.value = select
}
const searchPerformance = async () => {
	if(search.value===''&&defaultSelect.value==='') {
		const res = await api.selectPerformane()
		if(res.data.state === 200) {
			performanceStore.updatePerformanceList(res.data.data)
		}
		ElMessage.success('查询成功!')
		return
	}

	const req = ref({})
	if(search.value!==''&&defaultSelect.value==='') req.value = {
		createdTime: createdTime.value,
		conditions: search.value
	}
	if(defaultSelect.value!==''&&search.value==='') req.value = {
		createdTime: createdTime.value,
		post: defaultSelect.value
	}
	if(defaultSelect.value!==''&&search.value!=='') req.value = {
		createdTime: createdTime.value,
		post: defaultSelect.value,
		conditions: search.value
	}

	const res = await api.findPerByPostAndCondition(req.value)
	if(res.data.state === 200) {
		performanceStore.updatePerformanceList(res.data.data)
		ElMessage.success('查询成功!')
	}
}

const openEdit = () => {
	formEdit.value = {}
	dialogEditFormVisible.value = true
}

// 新建
const submitCreatedForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async(valid) => {
		if (valid) {
			const res = await api.insertPerformane(form.value)
			if(res.data.state === 200){
				performanceStore.refreshPerformance()
				dialogCreateFormVisible.value = false
				ElMessage.success('添加成功')
			} else {
				ElMessage.error('员工表中没有改员工，请先在员工信息中添加')
			}
		}
	})
}

/**
 * @desc 修改
 *
 * @param {FormInstance | undefined} formEl - The form instance.
 * @return {void} 
 */
const submitEditForm =  (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async(valid) => {
		if (valid) {
			const res = await api.updatePerformane(formEdit.value)
			if (res.data.state === 200) {
				performanceStore.refreshPerformance()
				dialogEditFormVisible.value = false
				ElMessage.success('修改成功')
			} else {
				ElMessage.error(res.data.message)
			}
		}
	})
}

/**
 * 导入前校验
 *
 * @param {any} file - The file object to be validated.
 * @return {boolean} - Returns true if the file extension is either 'xls' or 'xlsx', otherwise returns false.
 */
const beforeUpload = (file: any): boolean=> {
	var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
	const extension = testmsg === 'xls'
	const extension2 = testmsg === 'xlsx'

	if(!extension && !extension2) {
		ElMessage.error('请上传xls/xlsx格式的文件！');
		return false;
	}
	return (extension || extension2)
}

/**
 * 上传成功提示
 * Handles the upload success event.
 *
 * @return {void} 
 */
const handleUploadSuccess = async() => {
	const res = await api.selectPerformane()
	if(res.data.state === 200) {
		performanceStore.updatePerformanceList(res.data.data)
		console.log('performanceData:',res.data.data);               
	} else {
		return
	}
	ElMessage.success('上传成功!')
}

/**
 * 上传失败提示
 * Handles upload errors.
 *
 * @param {string} res - The error response.
 * @return {void} No return value.
 */
const handleUploadError =(res: string) => {
	console.log('err' + res);
  
	ElMessage.error('上传失败!')
}
</script>

<style lang="scss" scoped>
.performance-function {
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
.el-dialog {
    .el-select {
        width: 100%;
    }
}
</style>
