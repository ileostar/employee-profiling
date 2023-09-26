<template>
  <div class="examine-approve common-layout">
		<h1 class="title">登记审批</h1>
		<div class="fenge"></div>
    <div class="examine-approve-main">   
      <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="申请时间"
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
        <el-table-column prop="name" label="申请用户" width="180" />
        <el-table-column prop="address" label="内容" />

        <el-table-column
          prop="tag"
          label="状态"
          width="100"
          :filters="[
            { text: '已同意', value: '已同意' },
            { text: '已驳回', value: '已驳回' },
            { text: '待审批', value: '待审批' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="tagState(scope.row.tag)"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column v-if="Auth()" fixed="right" label="操作" width="140">
          <template #default>
            <el-button type="primary" size="small">同意</el-button
            >
            <el-button type="danger" size="small">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUsersStore()

const { infos } = storeToRefs(userStore)

interface User {
  date: string
  name: string
  address: string
  tag: string
  [index:string]: unknown
}
const Auth = () => infos.value.role === '普通用户' ? false : true

const tableRef = ref<TableInstance>()

// 标签状态
const tagState = (tag: string) => {
	switch (tag) {
	case '已同意': return 'success';
	case '已驳回': return 'info'
	default: return ''
	}
}
const filterHandler = (
	value: string,
	row: User,
	column: TableColumnCtx<User>
) => {
	const property = column['property']
	return row[property] === value
}

const filterTag = (value: string, row: User) => {
	return row.tag === value
}

const tableData: User[] = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: '已同意',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: '已驳回',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: '已同意',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: '已驳回',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: '待审批',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
		tag: '已驳回',
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