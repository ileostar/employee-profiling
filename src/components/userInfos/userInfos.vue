<template>
	<div class="userInfos">
		<div class="user-avatar">
      <img :src="infos.role === '管理员'?Administrator:OrdinaryUser" alt="">
      <!-- <el-upload class="avatar" action="#" list-type="picture-card" :auto-upload="false">  
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <el-icon><Download /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload> -->
    
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
		</div>
		<ul class="user-desc">
			<li>
				<p>用户名</p>
				<el-input v-model="infos.username" />
			</li>
			<li>
				<p>权限</p>
				<el-input v-model="infos.role" disabled />
			</li>
		</ul>
		<div class="user-fix-button">
			<el-button type="primary" @click="dialogFormVisible = true">修改密码</el-button>
			<el-button type="info" @click="editUserInfos">提交</el-button>
		</div>
	</div>
  <el-dialog v-model="dialogFormVisible" title="修改用户密码">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item label="原密码" props="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" props="prepassword" :label-width="formLabelWidth">
        <el-input v-model="form.prepassword" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" props="secondPrepassword" :label-width="formLabelWidth">
        <el-input v-model="form.secondPrepassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserPassword(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import api from '@/api/api'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import Administrator from '@/assets/images/管理员.png'
import OrdinaryUser from '@/assets/images/普通用户.png'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const userStore = useUsersStore()
const { infos } = storeToRefs(userStore)

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
	password: '',
	prepassword: '',
	secondPrepassword: ''
})

const ruleFormRef = ref<FormInstance>()

// 自定义表单校验规则
const password = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else {
		callback()
	}
}
const prepassword = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else {
		callback()
	}
}
const secondPrepassword = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码'))
	} else {
		callback()
	}
}

// 表单校验
const rules = reactive<FormRules>({
	password: [{ validator: password, trigger: 'blur' }],
	prepassword: [{ validator: prepassword, trigger: 'blur' }],
	code: [{ validator: secondPrepassword, trigger: 'blur' }],
})

const drawer = defineProps(['drawer'])

// 修改用户信息
const editUserInfos = async () => {
	const fixData = {
		id: userStore.infos.id as number,
		username: userStore.infos.username as string,
	}
	api.updateByUsername(fixData).then((res) => {
		console.log(res)
		if (res.data.state == 200) {
			userStore.updatePassword(fixData.username)
			ElMessage.success('修改成功')
		} else {
			ElMessage.error(res.data.message)
		}
		console.log(drawer)
	})
}

// 修改密码
const editUserPassword = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if(valid) {
			console.log(valid);
			const res = await api.updatePassword({id:Number(infos.value.id),password:form.password,prepassword:form.prepassword})
			if(res.data.state === 200) {
				infos.value = res.data
				dialogFormVisible.value = false
			}else {
				ElMessage.error(res.data.message)
			}
		} else {
			ElMessage.error('请正确填写表单！')
			return false
		}
	})
}
</script>

<style lang="scss" scoped>
.userInfos {
	padding: 5vh;
	.user-avatar {
		display: flex;
		width: 100%;
		justify-content: center;
		margin: 2vh 0;
		:deep(.el-upload) {
			border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
		}
	}
	.user-desc {
		display: flex;
		flex-direction: column;
		margin: 1vh;
		margin-top: 5vh;
		width: 100%;
		li {
			display: flex;
			margin-bottom: 3vh;
			justify-content: center;
			align-items: center;
			p {
				width: 5vw;
			}
		}
	}
	.user-fix-button {
		display: flex;
		justify-content: right;
	}
}
</style>
