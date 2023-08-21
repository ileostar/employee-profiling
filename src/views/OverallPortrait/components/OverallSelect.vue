<template>
	<div class="overall-portrait-select">
		<div class="overall-portrait-select-item">
			<p>单位</p>
			<el-select v-model="overallOptions.unit" clearable placeholder="Select">
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
			<el-select v-model="overallOptions.post" clearable placeholder="Select">
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
			<el-select v-model="overallOptions.age" clearable placeholder="Select">
        <el-option label="客户专员" value="客户专员" />
        <el-option label="信息专员" value="信息专员" />
        <el-option label="市场经理" value="市场经理" />
        <el-option label="综合管理员" value="综合管理员" />
        <el-option label="终端专员" value="终端专员" />
			</el-select>
		</div>
		<div class="overall-portrait-select-item">
			<p>学历</p>
			<el-select v-model="overallOptions.education" clearable placeholder="Select">
        <el-option label="客户专员" value="客户专员" />
        <el-option label="信息专员" value="信息专员" />
        <el-option label="市场经理" value="市场经理" />
        <el-option label="综合管理员" value="综合管理员" />
        <el-option label="终端专员" value="终端专员" />
			</el-select>
		</div>
		<el-button type="info">分析</el-button>
		<div class="overall-portrait-select-time">
			<el-select v-model="overallOptions" clearable placeholder="选择时间段">
        <el-option label="客户专员" value="客户专员" />
        <el-option label="信息专员" value="信息专员" />
        <el-option label="市场经理" value="市场经理" />
        <el-option label="综合管理员" value="综合管理员" />
        <el-option label="终端专员" value="终端专员" />
			</el-select>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue'

const postStore = usePostStore()
const { unitList } = storeToRefs(postStore)
const overallOptions = reactive({
	unit: '',
	post: '',
	sex: '',
	age: '',
	education: '',
})
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
