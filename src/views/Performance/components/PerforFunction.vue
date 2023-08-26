<template>
	<div class="performance-function">
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
		<el-form :model="form" :rules="formRules" ref="ruleFormRef">
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
				<el-button type="info" @click="submitCreatedForm(ruleFormRef)">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogFixFormVisible" title="修改">

		<el-form :model="form" :rules="formRules" ref="ruleFormRef">
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
				<el-button type="info" @click="submitCreatedForm(ruleFormRef)">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogInFormVisible" title="导入">
    111
	</el-dialog>
	<el-dialog v-model="dialogOutFormVisible" title="导出">
    111
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
import api from '@/api/api'
import { usePerformanceStore } from '@/stores/performance'
import { FormInstance } from 'element-plus'
import { Performance } from '@/api/type'

const PostStore = usePostStore()
const performanceStore = usePerformanceStore()
const { postData: select } = storeToRefs(PostStore)
const { performanceList } = storeToRefs(performanceStore)

const search = ref('')
const defaultSelect = ref('')
const currentDateList = ref<string[]>([])

const dialogCreateFormVisible = ref(false)
const dialogFixFormVisible = ref(false)
const dialogInFormVisible = ref(false)
const dialogOutFormVisible = ref(false)// 新建表单


const form = reactive<Performance>({})
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

/**
 * @param: 当前点击岗位对象
 * @desc: 切换当前下拉菜单显示
 */
const taggleSelect = (select: string) => {
	defaultSelect.value = select
}
const searchPerformance = async () => {
	
	const req = ref({})
	if(search.value===''&&defaultSelect.value==='') return
	if(search.value!==''&&defaultSelect.value==='') req.value = {
		conditions: search.value
	}
	if(defaultSelect.value!==''&&search.value==='') req.value = {
		post: defaultSelect.value
	}
	if(defaultSelect.value!==''&&search.value!=='') req.value = {
		post: defaultSelect.value,
		conditions: search.value
	}
  
	const res = await api.findPerByPostAndCondition(req.value)
	if(res.data.state === 200) {
		console.log(res.data.data);
    
		performanceStore.updatePerformanceList(res.data.data)
	}
}

// 新建
const submitCreatedForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async(valid) => {
		if (valid) {
			const res = await api.insertPerformane(form)
			performanceList.value.push(res.data.data)
		}
	})
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
</style>
