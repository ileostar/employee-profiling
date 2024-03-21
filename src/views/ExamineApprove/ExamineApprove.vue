<script lang="ts" setup>
import type { TableColumnCtx, TableInstance } from 'element-plus'

const userStore = useUsersStore()
const approvalsStore = useApprovalsStore()

const { infos } = storeToRefs(userStore)
const { approvalList } = storeToRefs(approvalsStore)

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

</script>

<template>
  <div class="examine-approve common-layout">
		<h1 class="title">登记审批</h1>
		<div class="fenge"></div>
    <div class="examine-approve-main">   
      <el-table ref="tableRef" row-key="date" :data="approvalList" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column
          prop="approvalTime"
          label="申请时间"
          sortable
          width="180"
          column-key="approvalTime"
          :filters="[
            { text: '2016-05-01', value: '2016-05-01' },
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler"
        />
        <el-table-column prop="username" label="申请用户" width="180" />
        <el-table-column prop="content" label="内容" />
        <el-table-column
          prop="state"
          label="状态"
          width="100"
          :filters="[
            '已同意',
            '已驳回',
            '待审批',
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="tagState(scope.row.state)"
              disable-transitions
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column v-if="Auth()" fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button type="primary" size="small" @click="approvalsStore.updateByIdYes(scope.row)">同意</el-button
            >
            <el-button type="danger" size="small" @click="approvalsStore.updateByIdNo(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

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
