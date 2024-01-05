<template>
	<div class="overall-portrait-select">
		<div class="overall-portrait-select-item">
			<p>单位</p>
			<el-select v-model="overallOptions.unit" clearable placeholder="单位">
				<el-option
					v-for="item in unitList"
					:key="item"
					:label="item"
					:value="item"
				/>
			</el-select>
		</div>
		<div class="overall-portrait-select-item">
			<p>岗位</p>
			<el-select v-model="overallOptions.post" clearable placeholder="岗位">
        <el-option label="客户专员" value="客户专员" />
        <el-option label="信息专员" value="信息专员" />
        <el-option label="市场经理" value="市场经理" />
        <el-option label="综合管理员" value="综合管理员" />
        <el-option label="终端专员" value="终端专员" />
			</el-select>
		</div>
		<div class="overall-portrait-select-item">
			<p>性别</p>
			<el-select v-model="overallOptions.sex" clearable placeholder="性别">
				<el-option label="男" value="男" />
				<el-option label="女" value="女" />
			</el-select>
		</div>
		<div class="overall-portrait-select-item">
			<p>年龄段</p>
			<el-select v-model="age" clearable placeholder="年龄段">
        <el-option label="18-25" value="1" />
        <el-option label="26-30" value="2" />
        <el-option label="31-35" value="3" />
        <el-option label="36-40" value="4" />
        <el-option label="41-50" value="5" />
        <el-option label="50以上" value="6" />
			</el-select>
		</div>
		<div class="overall-portrait-select-item">
			<p>学历</p>
			<el-select v-model="overallOptions.degree" clearable placeholder="学历">
        <el-option label="博士" value="博士" />
        <el-option label="硕士" value="硕士" />
        <el-option label="大学" value="大学" />
        <el-option label="大专" value="大专" />
        <el-option label="高中" value="高中" />
        <el-option label="初中" value="初中" />
			</el-select>
		</div>
		<el-button type="info" @click="handleAnalyze">分析</el-button>
		<div class="overall-portrait-select-time">
			<el-select v-model="overallOptions.createdTime" clearable placeholder="选择时间段">
        <el-option v-for="item in createdTimeList" :key="item" :label="item" :value="item" />
			</el-select>
		</div>
	</div>
</template>

<script lang="ts" setup>
import api from '@/api/api';
import { useEmployeeStore } from '@/stores/employee';
import { usePostStore } from '@/stores/post';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue'

const postStore = usePostStore()
const employeeStore = useEmployeeStore()
const { unitList } = storeToRefs(postStore)
const { createdTimeList } = storeToRefs(employeeStore)

onMounted(() => {
	hasCreatedTimeList()
})

const hasCreatedTimeList = async () => {
	if(createdTimeList.value) {
		const res = await api.getCreatedTime()
		if (res.data.state === 200) {
			employeeStore.updateCreatedTimeList(res.data.data)
		}
	}
}

const age = ref('')
const ageGroup = ref({
	minAge: '',
	maxAge: ''
})

type Overall = {
	unit?: string,
	post?: string,
	sex?: string,
	degree?: string,
	createdTime?: string
}

const overallOptions = reactive<Overall>({
	unit: '',
	post: '',
	sex: '',
	degree: '',
	createdTime: ''
})

/*
 * @desc 子传父：将分析结果传给父组件渲染
 */ 
const emit = defineEmits(['submitAnalyze'])
const handleAnalyze = async () => {
	// 处理数据
	switch (age.value) {
		case '1': 
			ageGroup.value = { minAge: '18', maxAge: '25' } 
			break;
		case '2': 
			ageGroup.value = { minAge: '26', maxAge: '30' }
			break;
		case '3': 
			ageGroup.value = { minAge: '31', maxAge: '35' }
			break;
		case '4': 
			ageGroup.value = { minAge: '36', maxAge: '40' }
			break;
		case '5': 
			ageGroup.value = { minAge: '41', maxAge: '50' }
			break;
		case '6': 
			ageGroup.value = { minAge: '50', maxAge: '100' }
			break;
	}

	const req:Overall = {};
	for (const key in overallOptions) {
		const value = overallOptions[key as keyof typeof overallOptions];
		if (value !== '') {
			req[key as keyof typeof overallOptions] = value;
		}
	}
  
	const res = await api.overallPortrait({
		...req,
		...ageGroup.value
	})
	if(res.data.state === 200) {
		emit('submitAnalyze', res.data.data,overallOptions,ageGroup.value);
		if(res.data.message){  
			ElMessage.success(res.data.message)
		}
	}
}
</script>

<style lang="scss" scoped>
.overall-portrait-select {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.overall-portrait-select-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		p {
			margin-right: 0.7vw;
		}
		.el-select {
			width: 8vw;
		}
	}
	.overall-portrait-select-time {
		display: flex;
		align-items: center;
		.el-select {
			width: 14vw;
		}
	}
}
</style>
