<template>
    <div class="login">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm">
          <div class="title">登录</div>
          <el-form-item label="用户名" prop="username" class="item">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password" class="item">
          <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"/>
          </el-form-item>
          <el-form-item class="login-button">
            <el-button  type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
          <router-link to="/register" tag="div" class="goRegister">转去注册</router-link>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import api from '@/api/api'
import { useUsersStore } from '@/stores/users';

const router = useRouter()
const userStore = useUsersStore()

const ruleFormRef = ref<FormInstance>()

const username = (_rule: any,value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const password = (_rule: any,value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [{ validator: username, trigger: 'blur' }],
  password: [{ validator: password, trigger: 'blur' }],
})

const submitForm = function (formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await api.login(ruleForm)
      if(res.data.state === 200){
        // 更新用户信息
        userStore.updateInfos(res.data.data.Username)

        // 设置token
        userStore.updateToken(res.data.data.uToken)
        
        ElMessage.success('登录成功');
        router.push('/');

      } else{
        ElMessage.error(res.data.message);
      }
    } else {
      ElMessage.error('请正确填写表单！')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss">
.login {
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background: url('@/assets/images/background.png') no-repeat;
    background-position: center center;
    background-size: cover;
    .el-form {
        width: 390px;
        height: 280px;
        padding: 30px;
        box-sizing: border-box;
        background-color: #b9b9b9;
        margin-left: -30px;
        border-radius: 20px;
        color: aliceblue;

        background: rgba(213, 209, 209, 0.2);
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        border-radius: 25px;
        box-shadow:inset 0 0 80px rgba(191, 172, 172, 0.3);
        
        .item .el-form-item__label {
          color: aliceblue;
          width: 80px!important;
          justify-content: center;
        }
        
        .login-button {     
          margin-bottom: 0!important;
        }

        .login-button>.el-form-item__content {
          margin-left: 80px!important;
        }

        .el-form-item {
          margin-bottom: 22px;
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