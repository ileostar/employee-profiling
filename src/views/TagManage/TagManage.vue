<template>
	<div class="tag-manage">
		<h1 class="title">标签管理</h1>
		<div class="tag-detail my-table">
			<el-tag
				v-for="tag in dynamicTags"
				:key="tag"
				class="mx-1"
				closable
				:disable-transitions="false"
				@click="editTagBox(tag as Infos)"
				@close="deleteIndexTag(tag as Infos)"
			>
				{{ tag.features }}
			</el-tag>

			<el-button class="more" size="small" @click="revealAppendBox">
				+
			</el-button>

			<el-dialog v-model="dialogFormVisible" title="添加标签">
				<el-form :model="form">
					<el-form-item label="标签名称" :label-width="formLabelWidth">
						<el-input
							ref="addInputRef"
							v-model="inputAddValue"
							class="ml-1 w-20"
						/>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取消</el-button>
						<el-button
							@click="handleInputConfirm"
							class="submitAdd"
							type="info"
						>
							确定
						</el-button>
					</span>
				</template>
			</el-dialog>
			<el-dialog v-model="dialogFormVisible2" title="修改标签">
				<el-form :model="form">
					<el-form-item label="标签名称" :label-width="formLabelWidth">
						<el-input ref="InputRef" v-model="clickTagName" class="ml-1 w-20" />
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible2 = false">取消</el-button>
						<el-button @click="handleInputEdit" class="submitEdit" type="info">
							确定
						</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElInput, ElMessage } from 'element-plus'
import { Infos, useTagStore } from '@/stores/tag'
import { storeToRefs } from 'pinia'
import api from '@/api/api'
import { useUsersStore } from '@/stores/users'

const tagStore = useTagStore()
const userStore = useUsersStore()

const { infos: auth } = storeToRefs(userStore)
const { info: dynamicTags } = storeToRefs(tagStore)
const inputAddValue = ref('')
// 记录当前点击的标签名和id
const clickTagName = ref('')
const clickTagId = ref(-1)

const addInputRef = ref<InstanceType<typeof ElInput>>()
const InputRef = ref<InstanceType<typeof ElInput>>()

const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const formLabelWidth = '140px'

const form = reactive({
	name: '',
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: '',
})

// 打开添加标签弹框
const revealAppendBox = () => {
	if (auth.value.role === '管理员') {
		dialogFormVisible.value = true
	} else {
		ElMessage.error('权限不足')
	}
}
// 打开修改标签弹框
const editTagBox = (tag: Infos) => {
	if (auth.value.role === '管理员') {
		clickTagName.value = tag.features as string
		clickTagId.value = tag.id as number
		dialogFormVisible2.value = true
	}
}

// 添加标签
const handleInputConfirm = async () => {
	if (inputAddValue.value) {
		const res = await api.insertTag({ features: inputAddValue.value })
		if (res.data.state === 200) {
			dynamicTags.value.push(res.data.data)
			ElMessage.success('添加成功')
		} else {
			ElMessage.error(res.data.message)
		}
	}
	inputAddValue.value = ''
	dialogFormVisible.value = false
}

// 删除标签
const deleteIndexTag = async (tag: Infos) => {
	if (auth.value.role === '管理员') {
		const res = await api.deleteTag(tag.id as number)
		if (res.data.state === 200) {
			dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
			ElMessage.success('删除成功')
		} else {
			ElMessage.error(res.data.message)
		}
	} else {
		ElMessage.error('权限不足')
	}
}

// 修改标签
const handleInputEdit = async () => {
	const updateData = {
		id: clickTagId.value,
		features: clickTagName.value,
	}
	const res = await api.updateTag(updateData)
	if (res.data.state === 200) {
		dynamicTags.value.forEach((item) => {
			if (item.id === clickTagId.value) {
				item.features = clickTagName.value
			}
		})
		ElMessage.success('修改成功')
	} else {
		ElMessage.error(res.data.message)
	}
	clickTagName.value = ''
	clickTagId.value = -1
	dialogFormVisible2.value = false
}
</script>

<style lang="scss" scoped>
.tag-manage {
	padding: 3vh;
	.tag-detail {
		padding: 1.5vh;
		.el-tag {
			height: 4vh;
			margin-right: 1.2vh;
      margin-bottom: 1vh;
			cursor: pointer;
			background-color: #478781;
			color: #fff;
			:deep .el-tag__close {
				background-color: #fff;
				margin: 0 0.2vw 0 0.6vw;
				color: #478781;
			}
		}
		.el-button {
			margin-top: -0.25vh;
			height: 4vh;
			line-height: 4vh;
			font-size: 3vh;
			background-color: #478781;
			color: #fff;
		}
		.dialog-footer {
			.el-button {
				font-size: 2.5vh;
			}
			.submitAdd,
			.submitEdit {
				color: #fff;
			}
		}
	}
}
</style>
