<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
	<div class="register">
    <header>基于员工画像的绩效结果评估系统</header>
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			status-icon
			:rules="rules"
			label-width="120px"
			class="demo-ruleForm"
		>
			<div class="title">注册</div>
			<el-form-item label="用户名" prop="username" class="item">
				<el-input v-model="ruleForm.username" type="text" autocomplete="off" />
			</el-form-item>
			<el-form-item label="密码" prop="password" class="item">
				<el-input
					v-model="ruleForm.password"
					type="password"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkpassword" class="item">
				<el-input
					v-model="ruleForm.checkpassword"
					type="password"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item class="login-button">
				<el-button type="primary" @click="submitForm(ruleFormRef)">
					注册
				</el-button>
				<el-button @click="resetForm(ruleFormRef)">重置</el-button>
			</el-form-item>
			<router-link to="/login" tag="div" class="goLogin">转去登陆</router-link>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import api from '@/api/api'
import router from '@/router'

const ruleFormRef = ref<FormInstance>()

// 校验规则
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
		if (ruleForm.checkpassword !== '') {
			if (!ruleFormRef.value) return
			ruleFormRef.value.validateField('checkpassword', () => null)
		}
		callback()
	}
}
const checkpassword = (_rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请再次输入密码'))
	} else if (value !== ruleForm.password) {
		callback(new Error('两次密码不一致!'))
	} else {
		callback()
	}
}
const rules = reactive<FormRules>({
	username: [{ validator: username, trigger: 'blur' }],
	password: [{ validator: password, trigger: 'blur' }],
	checkpassword: [{ validator: checkpassword, trigger: 'blur' }],
})

// 表单信息
const ruleForm = reactive({
	username: '',
	password: '',
	checkpassword: '',
})

// 提交表单注册
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid: any) => {
		if (valid) {
			const regForm = {
				username: ruleForm.username,
				password: ruleForm.password,
			}
			api.register(regForm).then((res) => {
				console.log(res)
				if (res.data.state === 200) {
					ElMessage.success('注册成功')
					router.push('/login')
				} else {
					ElMessage.error(res.data.message)
				}
			})
		} else {
			ElMessage.error('请正确填写表单！')
			return false
		}
	})
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}
</script>

<style lang="scss">
.register {
	display: flex;
	width: 100vw;
	justify-content: center;
	align-items: center;
	background: url('@/assets/images/background.png') no-repeat;
	background-position: center center;
	background-size: cover;
  header {
    position: absolute;
    z-index: 33;
    font-family: Georgia, serif;
    font-size: 3.2vw;
    font-weight: bold;
    top: 12vh;
    color: #d8d8d8;
  }
	.el-form {
		width: 390px;
		height: 330px;
		padding: 30px;
		box-sizing: border-box;
		background-color: #b9b9b9;
		border-radius: 20px;
		color: aliceblue;

		background: rgba(213, 209, 209, 0.2);
		-webkit-backdrop-filter: blur(30px);
		backdrop-filter: blur(30px);
		border-radius: 25px;
		box-shadow: inset 0 0 80px rgba(191, 172, 172, 0.3);

		.item .el-form-item__label {
			color: aliceblue;
			width: 80px !important;
			justify-content: center;
		}

		.login-button {
			margin-bottom: 0 !important;
		}

		.login-button > .el-form-item__content {
			margin-left: 80px !important;
		}

		.el-form-item {
			margin-bottom: 19px;
		}

		.title {
			display: block;
			width: 100%;
			height: 5vh;
			text-align: center;
			font-size: 28px;
			margin-bottom: 28px;
		}

		.goLogin {
			position: relative;
			float: right;
			color: aliceblue;
		}
	}
}
</style>
