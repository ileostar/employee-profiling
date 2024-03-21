<script lang="ts" setup>
import * as _ from 'lodash'
import { ElMessage } from 'element-plus'
import { Employee } from '@/api/type';

const EmployeeStore = useEmployeeStore()
const { EmployeeList:tableData,dialogFixFormVisible,form2,tableEmployee } = storeToRefs(EmployeeStore)

const editCurrentEmployee = async (row: Employee) => {
	const data = _.cloneDeep(toRaw(row))
	dialogFixFormVisible.value = true
	form2.value = data
	console.log(row)
}

/**
 * Deletes the user at the specified index.
 *
 * @param {performanceRow} row - The row containing the user data.
 * @return {Promise<void>} - A promise that resolves when the user is deleted.
 */
const deleteIndexUser = async (row: Employee) => {
	const deleteData = toRaw(row)
  
	const res = await api.deleteEmployee(Number(deleteData.id))
	if (res.data.state === 200) {
		EmployeeStore.refreshEmployeeList()
		ElMessage.success('删除成功')
	} else {
		ElMessage.error(res.data.message)
	}
}
</script>

<template>
	<div class="tableContainer" ref="tableContainer">
    <el-table :data="tableData" stripe style="width: 100%;height: 100%;" :scrollbar-always-on="true">
      <el-table-column v-for="item, index in tableEmployee" :key="item.value" :prop="index" :width="item.width" :label="item.label" sortable/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editCurrentEmployee(scope.row)">
            修改</el-button>
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

<style lang="scss">
.tableContainer {
	height: 79vh;
	width: 82.7vw;

	.el-table-v2 {
		height: 100%;
	}
}
</style>
