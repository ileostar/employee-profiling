<template>
  <div class="examine-approve common-layout">
		<h1 class="title">登记审批</h1>
		<div class="fenge"></div>
    <div class="examine-approve-main">   
      <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="Date"
          sortable
          width="180"
          column-key="date"
          :filters="[
            { text: '2016-05-01', value: '2016-05-01' },
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler"
        />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" :formatter="formatter" />

        <el-table-column
          prop="tag"
          label="Tag"
          width="100"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === 'Home' ? '' : 'success'"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'

interface User {
  date: string
  name: string
  address: string
  tag: string
}

const tableRef = ref<TableInstance>()

const filterTag = (value: string, row: User) => {
	return row.tag === value
}
const filterHandler = (
	value: string,
	row: User,
	column: TableColumnCtx<User>
) => {
	const property = column['property']
	return row[property] === value
}

const tableData: User[] = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: 'Home',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: 'Office',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: 'Home',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: 'Office',
	},
]
</script>
<style lang="scss" scoped>
.examine-approve {
	padding: 3vh;
  .examine-approve-main {
		padding: 1.5vh;
		height: 100%;
		width: 100%;
		overflow: hidden;
  }
}
</style>