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
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { TableV2SortOrder } from 'element-plus'
import type { SortBy } from 'element-plus'

const tableWidth = ref(1125)
const tableHeight = ref(550)

// 获取表格容器的引用
const tableContainer = ref(null)

// 监听表格容器尺寸的变化，并更新表格的宽度和高度
watchEffect(() => {
	if (tableContainer.value) {
		tableWidth.value = (tableContainer.value as HTMLElement).offsetWidth
		tableHeight.value = (tableContainer.value as HTMLElement).offsetHeight
	}
})

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
	Array.from({ length }).map((_, columnIndex) => ({
		...props,
		key: `${prefix}${columnIndex}`,
		dataKey: `${prefix}${columnIndex}`,
		title: `列 ${columnIndex}`,
		width: 150,
	}))

const generateData = (
	columns: ReturnType<typeof generateColumns>,
	length = 200,
	prefix = 'row-',
) =>
	Array.from({ length }).map((_, rowIndex) => {
		return columns.reduce(
			(rowData, column, columnIndex) => {
				rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
				return rowData
			},
			{
				id: `${prefix}${rowIndex}`,
				parentId: null,
			},
		)
	})

const columns = generateColumns(10)
let data = generateData(columns, 200)

columns[0].sortable = true

const sortState = ref<SortBy>({
	key: 'column-0',
	order: TableV2SortOrder.ASC,
})

const onSort = (sortBy: SortBy) => {
	console.log(sortBy)
	data = data.reverse()
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
