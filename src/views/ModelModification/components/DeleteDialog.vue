<template>
  <el-dialog class="delete-dialog" v-model="dialogDeleteVisible" title="删除模型">
    <template #default>
      <el-select v-model="deleteModel" placeholder="选择你要删除的模型">
        <el-option v-for="item of modelTotal" :key="item" :label="item" :value="item" />
      </el-select>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
        <el-button type="primary" @click="verifyDelete">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * Verify delete function.
 *
 * @return {void}
 */
const verifyDelete = (): void => {
	if(deleteModel.value === '') {
		ElMessage({
			type: 'info',
			message: '请先填写你要删除的模型',
		})
	} else {
		open()
	}
}

/**
 * 确认弹框
 * Opens a confirmation dialog and performs a delete operation if confirmed.
 */
const open = () => {
	ElMessageBox.confirm(
		'选中模型会被删除，此操作不可逆，请确认您的操作?',
		'确认操作',
		{
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}
	)
		.then(() => {
			modelStore.deleteModel(deleteModel.value)
			dialogDeleteVisible.value = false
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消删除',
			})
		})
}

const modelStore = useModelStore()
const { modelTotal,dialogDeleteVisible } = storeToRefs(modelStore)

const deleteModel = ref('')
</script>
