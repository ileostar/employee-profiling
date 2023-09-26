<template>
  <div class="model-modification common-layout">
		<h1 class="title">模型修改</h1>
		<div class="fenge"></div>
    <div class="model-modification-main">
      <div class="function">
        <div class="model-select">
          <p>全局模型切换</p>
          <el-select v-model="currentModelValue" class="m-2" placeholder="选择模型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <p style="margin-left: 1vw;color: gray; font-size: small;">
            (全局模型切换，会消耗一定时间，请谨慎切换！)
          </p>
        </div>
        <div class="function-button">
          <el-button type="primary">新建</el-button>
          <el-button type="info">修改</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="model-message my-table">
        <div class="function-select">
          <div class="model-select">
            <p>查看模型</p>
            <el-select v-model="currentSelectModel" class="m-2" placeholder="选择模型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="post-select">
            <p>岗位切换</p>
            <el-select v-model="currentSelectPost" class="m-2" placeholder="选择岗位">
              <el-option
                v-for="item in postData"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
        <el-divider />
        <el-form
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
        >
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const postStore = usePostStore()
const { postData } = storeToRefs(postStore)
// 当前全局模型
const currentModelValue = ref('')
// 当前查看模型
const currentSelectModel = ref('')
// 当前查看模型岗位
const currentSelectPost = ref('')

const options = [
	{
		value: '模型一',
		label: '模型一',
	},
	{
		value: '模型二',
		label: '模型二',
	},
]

const formLabelAlign = reactive({
	name: '',
	region: '',
	type: '',
})
</script>
<style lang="scss" scoped>
.model-modification {
	padding: 3vh;
  .model-modification-main {
		padding: 1.5vh;
		height: 100%;
		width: 100%;
		overflow: hidden;
    .function {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1vh 0 2vh;
      .model-select {
        
        display: flex;
        align-items: center;
        padding-right: 2vh;
        p {
          font-size: 15px;
          padding-right: 2vh;
        }
      }
      .function-button {
        display: flex;
        align-items: center;
      }  
    }
    .model-message {
      padding: 1vh;
      width: 100%;
      height: 92%;
      .function-select {
        display: flex;
        align-items: center;
        margin: 0.5vh 1vw -1vw;
        .model-select,.post-select {
          display: flex;
          align-items: center;
          padding-right: 2vh;
          p {
            font-size: 15px;
            padding-right: 2vh;
          }
        }
      }
    }
  }
}
</style>