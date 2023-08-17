<template>
	<div class="employee-portrait">
		<div class="employee-portrait-aside">
			<div class="portrait-aside-header">
				<p class="aside-title">员工</p>
				<el-input
					v-model="input3"
					class="w-50 m-2"
					size="small"
					placeholder="请输入员工姓名"
					:prefix-icon="Search"
				/>
			</div>
			<div class="portrait-aside-body">111</div>
			<div class="portrait-aside-pagination">111</div>
		</div>
		<div class="employee-portrait-main">
			<EmployeeInfo />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import EmployeeInfo from './components/EmployeeInfo.vue'
const input3 = ref('')
</script>

<style lang="scss" scoped>
.employee-portrait {
	display: flex;
	width: 86vw;
	.employee-portrait-aside {
		height: 93.5vh;
		width: 14vw;
		padding: 2vh;
		border-right: 2px solid #ebeef5;
		background-color: #f5f6f6;
		.portrait-aside-header {
			display: flex;
			flex-direction: column;
			height: 8vh;
			justify-content: space-between;
			margin-bottom: 2vh;
			.aside-title {
				font-size: 2vh;
			}
		}
		.portrait-aside-body {
			height: 85%;
		}
	}
	.employee-portrait-main {
		width: 100%;
	}
}
</style>
