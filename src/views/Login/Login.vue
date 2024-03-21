<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUsersStore()

const ruleFormRef = ref<FormInstance>()

const { imgUrl, refreshImage } = useRefreshImage()

/** 自定义表单校验规则 */
const username = useCheckForm('请输入用户名')
const password = useCheckForm('请输入密码')
const code = useCheckForm('请输入验证码')

/** 表单 */
const ruleForm = reactive({
	username: '',
	password: '',
	code: ''
})

/** 表单校验 */
const rules = reactive<FormRules>({
	username: [{ validator: username, trigger: 'blur' }],
	password: [{ validator: password, trigger: 'blur' }],
	code: [{ validator: code, trigger: 'blur' }],
})

/** 提交表单 */
const submitForm = function (formEl: FormInstance | undefined) {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await api.login(ruleForm)
			if (res.data.state === 200) {
				// 更新用户信息
				userStore.updateInfos(res.data.data.Username)

				// 设置token
				userStore.updateToken(res.data.data.uToken)

				ElMessage.success('登录成功')
				router.push('/')
			} else {
				ElMessage.error(res.data.message)
				return false
			}
		} else {
			ElMessage.error('请正确填写表单！')
			return false
		}
	})
}

/** 回车键登录 */
const useKeyDown = (e: { keyCode: number }) => {
	if (e.keyCode == 13 || e.keyCode == 100) {
		submitForm(ruleFormRef.value)
	}
}

useEventListen(useKeyDown,refreshImage)
</script>

<template>
	<div class="login">
    <header>基于员工画像的绩效结果评估系统</header>
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			status-icon
			:rules="rules"
			label-width="120px"
			class="demo-ruleForm"
		>
			<div class="title">登录</div>
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
			<el-form-item class="code item" label="验证码" prop="code" >
				<el-input v-model="ruleForm.code" type="text" autocomplete="off" />
        <img id="codeImg" :src="imgUrl" class="codeImg" @click="refreshImage">
			</el-form-item>
			<el-form-item class="login-button">
				<el-button type="primary" @click="submitForm(ruleFormRef)"  @keydown.enter="useKeyDown($event)">
					登陆
				</el-button>
				<el-button @click="useRetForm(ruleFormRef)">重置</el-button>
			</el-form-item>
			<router-link to="/register" tag="div" class="goRegister">
				转去注册
			</router-link>
		</el-form>
	</div>
</template>

<style lang="scss">
.login {
  overflow: hidden;
	display: flex;
	width: 100vw;
  height: 100vh;
	justify-content: center;
	align-items: center;
	background: url('@/assets/images/background.png') no-repeat;
	background-position: center center;
	background-size: cover;
  header {
    position: absolute;
    margin: auto;
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

    .code {
      display: flex;
      justify-content: center;
      .el-input {
        width: 150px;
      }
      .codeImg {
        display: block;
        overflow: hidden;
        flex: 1;
        padding-left: 10px;
        height: 100%;
        cursor: pointer;
      }
    }

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

		.goRegister {
			position: relative;
			float: right;
			color: aliceblue;
		}
	}
}
</style>
