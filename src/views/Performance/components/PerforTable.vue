<template>
	<div class="tableContainer" ref="tableContainer">
    <el-table :data="tableData" style="width: 100%;height: 100%;" stripe :scrollbar-always-on="true">
      <el-table-column prop="id" sortable label="序号" width="100" />
      <el-table-column prop="number" sortable label="员工编号" width="130" />
      <el-table-column prop="name" label="员工姓名" width="140" />
      <el-table-column prop="unit" label="单位" width="130" />
      <el-table-column prop="post" label="岗位" width="130" />
      <el-table-column prop="createdTime" label="考核时间" width="130"/>
      <el-table-column prop="scores" sortable label="月度绩效"/>
      <el-table-column fixed="right" label="操作" width="130">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editCurrentEmployee(scope.row)">
            修改</el-button
          >
          <el-popconfirm
							title="你确定要删除当前用户吗?"
							width="220"
							@confirm="deleteIndexUser(scope.row)"
						>
							<template #reference>
								<el-button link type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>

<script lang="ts" setup>
import { usePerformanceStore } from '@/stores/performance'
import { storeToRefs } from 'pinia'
import api from '@/api/api'
import { ElMessage } from 'element-plus'
import { toRaw } from 'vue'

const performanceStore = usePerformanceStore()
const { performanceList:tableData,dialogEditFormVisible,formEdit } = storeToRefs(performanceStore)

type performanceRow = {
  id: number
  number: number
  name: string
  unit: string
  post: string
  createdTime: string
  scores: number
}

/**
 * Handles the edit operation for the given performance row.
 *
 * @param {performanceRow} row - The performance row to be edited.
 */
const editCurrentEmployee = async (row: performanceRow) => {
	const data = toRaw(row)
	dialogEditFormVisible.value = true
	formEdit.value = data
	console.log(row)
}

/**
 * Deletes the user at the specified index.
 *
 * @param {performanceRow} row - The row containing the user data.
 * @return {Promise<void>} - A promise that resolves when the user is deleted.
 */
const deleteIndexUser = async (row: performanceRow) => {
	const deleteData = toRaw(row)
	const res = await api.deletePerformane({ id: deleteData.id })
	if (res.data.state === 200) {
		performanceStore.refreshPerformance()
		ElMessage.success('删除成功')
	} else {
		ElMessage.error(res.data.message)
	}
}

</script>

<style lang="scss" scoped>
.tableContainer {
	height: 79vh;
	width: 82.7vw;
	position: relative;
	.el-table-v2 {
		height: 100%;
	}
}
</style>
