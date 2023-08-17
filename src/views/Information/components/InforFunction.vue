<!-- eslint-disable indent -->
<template>
	<div class="information-function">
    <el-select v-model="currentDate" class="m-2" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
		<div class="function-selectSearch">
			<div class="mt-4">
				<el-input
					v-model="search"
					placeholder="请输入员工编号或姓名"
					class="input-with-select"
				>
					<template #prepend>
						<el-select
							:placeholder="defaultSelect == '' ? '选择岗位' : defaultSelect"
							style="width: 115px"
						>
							<el-option
								v-for="item of select"
								@click="taggleSelect(item)"
								:label="item"
								:key="item"
								value="1"
							/>
						</el-select>
					</template>
					<template #append>
						<el-button :icon="Search" @click="searchEmployee" />
					</template>
				</el-input>
			</div>
		</div>
		<div class="function-button">
			<el-button
				class="funtion-button-item"
				@click="dialogCreateFormVisible = true"
				type="default"
				text
			>
				<el-icon><DocumentAdd /></el-icon>
				<p>新建</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogFixFormVisible = true"
				type="default"
				text
			>
				<el-icon><Edit /></el-icon>
				<p>修改</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogInFormVisible = true"
				type="default"
				text
			>
				<el-icon><Upload /></el-icon>
				<p>导入</p>
			</el-button>
			<el-button
				class="funtion-button-item"
				@click="dialogOutFormVisible = true"
				type="default"
				text
			>
				<el-icon><Download /></el-icon>
				<p>导出</p>
			</el-button>
		</div>
	</div>
	<el-dialog v-model="dialogCreateFormVisible" title="新建">
		<el-form :model="form">
			<el-form-item label="Promotion name" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Zones" :label-width="formLabelWidth">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogCreateFormVisible = false">取消</el-button>
				<el-button type="info" @click="dialogCreateFormVisible = false">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogFixFormVisible" title="修改">
		<el-form :model="form">
			<el-form-item label="Promotion name" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Zones" :label-width="formLabelWidth">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFixFormVisible = false">取消</el-button>
				<el-button type="info" @click="dialogFixFormVisible = false">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogInFormVisible" title="导入">
    <el-upload
    class="upload-demo"
    drag
    action="http://8.134.133.19:8827/upload"
    multiple
    :before-upload="beforeAvatarUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        Please upload the xls/xlsx file
      </div>
    </template>
  </el-upload>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogInFormVisible = false">取消</el-button>
				<el-button type="info" @click="dialogInFormVisible = false">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogOutFormVisible" title="导出">
		<el-form :model="form">
			<el-form-item label="Promotion name" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="Zones" :label-width="formLabelWidth">
				<el-select v-model="form.region" placeholder="Please select a zone">
					<el-option label="Zone No.1" value="shanghai" />
					<el-option label="Zone No.2" value="beijing" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogOutFormVisible = false">取消</el-button>
				<el-button type="info" @click="dialogOutFormVisible = false">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
import api from '@/api/api'

const EmployeeStore = useEmployeeStore()
const PostStore = usePostStore()

const { createdTime: currentDate }  = storeToRefs(EmployeeStore)
const search = ref('')
const defaultSelect = ref('')
const { postData: select } = storeToRefs(PostStore)
const dialogCreateFormVisible = ref(false)
const dialogFixFormVisible = ref(false)
const dialogInFormVisible = ref(false)
const dialogOutFormVisible = ref(false)
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

const { createdTimeList: options } = storeToRefs(EmployeeStore)

/**
 * @param: 当前点击岗位对象
 * @desc: 切换当前下拉菜单显示
 */
const taggleSelect = (select: string) => {
	defaultSelect.value = select
}

/**
 * Validates the file extension before uploading the avatar.
 *
 * @param {any} file - The file object to be validated.
 * @return {boolean} - Returns true if the file extension is either 'xls' or 'xlsx', otherwise returns false.
 */
const beforeAvatarUpload = (file: any)=> {
	var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
	const extension = testmsg === 'xls'
	const extension2 = testmsg === 'xlsx'

	if(!extension && !extension2) {
		ElMessage.error('请上传xls/xlsx格式的文件！');
		return false;
	}
	// return isJPG && isLt2M;
	return (extension || extension2)
}
const searchEmployee = async () => {
	const res = await api.findByPostAndCondition({ post: defaultSelect.value,condition: search.value })
	if(res.data.state === 200) {
		EmployeeStore.updateEmployeeList(res.data.data)
		console.log(res.data.data)
	}
}
</script>

<style lang="scss" scoped>
.information-function {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 0 0.5vw;
	.function-selectSearch {
		width: 30vw;
		overflow: hidden;
		border-radius: 5px;
		text-align: center;
		margin: 0 2vw;

		.input-with-select .el-input-group__prepend {
			background-color: var(--el-fill-color-blank);
		}
	}
	.function-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 4.8vh;
		width: 22vw;
		.el-button {
			width: 5vw;
			p {
				padding-left: 4px;
			}
		}
	}
}
</style>
