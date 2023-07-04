<template>
    <div class="register">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm">
        <div class="title">注册</div>
        <el-form-item label="用户名" prop="username" class="item">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" class="item">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword" class="item">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button  type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
        <router-link to="/login" tag="div" class="goLogin">转去登陆</router-link>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

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
    callback(new Error("两次密码不一致!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
  checkpassword: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: username, trigger: 'blur' }],
  password: [{ validator: password, trigger: 'blur' }],
  checkpassword: [{ validator: checkpassword, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
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
.register {
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background: url('@/assets/images/background.png') no-repeat;
    background-position: center center;
    background-size: cover;
    .el-form {
        width: 390px;
        height: 330px;
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