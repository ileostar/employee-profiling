<template>
	<div class="position-portrait">
		<div class="position-portrait-aside">
			<div class="portrait-aside-header">
				<p class="aside-title">岗位</p>
				<el-input
					v-model="input3"
					class="w-50 m-2"
					size="small"
					placeholder="请输入岗位"
					:prefix-icon="Search"
				/>
			</div>
			<div class="portrait-aside-body">111</div>
			<div class="portrait-aside-pagination">111</div>
		</div>
		<div class="position-portrait-main common-layout">
			<h1 class="title">岗位画像特征</h1>
			<div class="fenge"></div>
			<div class="main-content">
				<div class="content">
					<div class="content-analyze">
						<li>相关性分析</li>
						<el-table :data="tableData" border style="width: 100%">
							<el-table-column prop="date" label="Date" width="180" />
							<el-table-column prop="name" label="Name" width="180" />
							<el-table-column prop="address" label="Address" />
						</el-table>
					</div>
					<div class="content-matching">
						<li>员工匹配度</li>
						<el-table :data="tableData2" height="310" style="width: 100%">
							<el-table-column prop="date" label="Date" width="180" />
							<el-table-column prop="name" label="Name" width="180" />
							<el-table-column prop="address" label="Address" />
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input3 = ref('')
const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
]

const tableData2 = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
]
</script>

<style lang="scss" scoped>
.position-portrait {
	display: flex;
	width: 86vw;
	.position-portrait-aside {
		height: 93.5vh;
		width: 12.2vw;
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
	.position-portrait-main {
		.main-content {
			height: 100%;
			width: 100%;
			border-radius: 1vh;
			overflow: hidden;

			.content {
				padding: 1vh 0;
				display: flex;
				flex-direction: column;
				height: 100%;
				.content-analyze {
					height: 46%;
					.el-table {
						margin: 1vh 0;
					}
				}
				.content-matching {
					height: 54%;
				}
			}
		}
	}
}
</style>
