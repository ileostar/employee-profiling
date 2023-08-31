<template>
	<div class="account-manage">
		<h1 class="title">账号管理</h1>
		<div class="account-table my-table">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column
					v-for="(prop, index) of tableProps.slice(0, 4)"
					:key="index"
					:prop="prop"
					:label="handleReflection(prop)"
					:width="prop === 'createdTime' ? 230 : 100"
				/>
				<el-table-column align="right">
					<template #default="scope">
						<el-button
							link
							type="info"
							size="small"
							@click="handleClick(scope.row)"
						>
							修改
						</el-button>
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
		<el-dialog v-model="dialogFormVisible" title="修改用户信息">
			<el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input
						v-model="ruleForm.username"
						prop="username"
						:placeholder="currenRowData.username"
						autocomplete="off"
					/>
				</el-form-item>
				<el-form-item
					label="密码"
					prop="password"
					:label-width="formLabelWidth"
				>
					<el-input
						v-model="ruleForm.password"
						type="password"
						autocomplete="off"
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="submitEditForm(ruleFormRef)">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, toRaw } from 'vue'
import api from '@/api/api'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const userStore = useUsersStore()
const { allUsers } = storeToRefs(userStore)

const tablePropsReflection = ref<{
  [key: string]: string;
}>({
	id: '序号',
	username: '用户名',
	role: '权限',
	createdTime: '创建时间',
})

const handleReflection = (key: string) => {
	return tablePropsReflection.value[key]
}

// 过滤管理员
const tableData = computed(() => {
	return allUsers.value.filter((item) => item.role !== '管理员')
})

const tableProps: string[] = Object.keys(toRaw(tableData.value[0]))?.filter(
	(item: unknown) => item !== 'password' && item !== 'salt',
)

const currenRowData = ref()
const ruleFormRef = ref<FormInstance>()

const username = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入用户名'))
	} else {
		callback()
	}
}
const password = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else {
		callback()
	}
}

const ruleForm = reactive({
	username: '',
	password: '',
})

const rules = reactive<FormRules>({
	username: [{ validator: username, trigger: 'blur' }],
	password: [{ validator: password, trigger: 'blur' }],
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const submitEditForm = function (formEl: FormInstance | undefined) {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const editUsername = {
				id: currenRowData.value.id as number,
				username: ruleForm.username as string,
			}
			const editPassword = {
				id: Number(currenRowData.value.id),
				password: ruleForm.password,
			}

			const res = await api.updateByUsername(editUsername)

			if (res.data.state === 200) {
				const res2 = await api.updateByPassword(editPassword)
				if (res2.data.state === 200) {
					// 更新用户信息
					const res3 = await api.selectUser()
					if (res3.data.state === 200) {
						allUsers.value = res3.data.data
					} else {
						location.reload()
					}

					ElMessage.success('修改成功')
					ruleForm.username = ''
					ruleForm.password = ''
					dialogFormVisible.value = false
				} else {
					ElMessage.error(res2.data.message)
				}
			} else {
				ElMessage.error(res.data.message)
			}
		} else {
			ElMessage.error('请正确填写表单！')
			return false
		}
	})
}

const handleClick = (row: any) => {
	dialogFormVisible.value = true
	currenRowData.value = row
	console.log(currenRowData.value)
}

const deleteIndexUser = async (row: any) => {
	const deleteData = toRaw(row)
	console.log(deleteData)

	const res = await api.deleteUser(deleteData.id)
	if (res.data.state === 200) {
		tableData.value.splice(tableData.value.indexOf(row), 1)
		ElMessage.success('删除成功')
	} else {
		ElMessage.error(res.data.message)
	}
}
</script>

<style lang="scss" scoped>
.account-manage {
	padding: 3vh;
	.account-table {
		.el-table {
			width: 100%;
			height: 100%;
		}
	}

	.el-input {
		width: 300px;
	}
	.dialog-footer button:first-child {
		margin-right: 10px;
	}
}
</style>
