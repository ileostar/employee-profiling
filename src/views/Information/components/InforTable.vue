<template>
	<div class="tableContainer" ref="tableContainer">
		<el-table-v2
			:columns="columns"
			:data="data"
			:sort-by="sortState"
			:width="tableWidth"
			:height="tableHeight"
			fixed
			@column-sort="onSort"
      @click="demo"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { TableV2SortOrder } from 'element-plus'
import type { SortBy } from 'element-plus'
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'

const EmployeeStore = useEmployeeStore()
const { EmployeeCloumn,EmployeeList } = storeToRefs(EmployeeStore)

const tableWidth = ref(1125)
const tableHeight = ref(550)

// 获取表格容器的引用
const tableContainer = ref(null)

const data = ref<Array<any>>([])

// 监听表格容器尺寸的变化，并更新表格的宽度和高度
watchEffect(() => {
	if (tableContainer.value) {
		tableWidth.value = (tableContainer.value as HTMLElement).offsetWidth
		tableHeight.value = (tableContainer.value as HTMLElement).offsetHeight
	}
})

// 员工信息表头
const generateColumns = (props?: any) =>
	EmployeeCloumn.value.map((item: string) => ({
		...props,
		key: item,
		dataKey: item,
		title: item,
		width: 120,
	}))

const generateData = (columns: ReturnType<typeof generateColumns>) => 
	EmployeeList.value.map((row: { [s: string]: unknown } | ArrayLike<unknown>) => {
		const rowData: { [key: string]: any } = {};

		columns.forEach((column, columnIndex) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			rowData[column.dataKey] = Object.entries(row).map(([_key, value]) => value)[columnIndex+1]
		});

		return rowData;
	})

const columns = generateColumns()
// 监听Employeeist的更新变化
watchEffect(() => data.value = generateData(columns));

function demo() {
	console.log(data)
}

columns[0].sortable = true

const sortState = ref<SortBy>({
	key: 'column-0',
	order: TableV2SortOrder.ASC,
})

const onSort = (sortBy: SortBy) => {
	console.log(sortBy)
	data.value = data.value.reverse()
	sortState.value = sortBy
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
