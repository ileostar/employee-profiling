<template>
  <div class="model-modification common-layout">
		<h1 class="title">模型修改</h1>
		<div class="fenge"></div>
    <div class="model-modification-main">
      <div class="function">
        <div class="function-select">
          <div class="model-select">
            <p>模型切换</p>
            <el-select v-model="value" class="m-2" placeholder="选择模型">
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
            <el-select v-model="value" class="m-2" placeholder="选择岗位">
              <el-option
                v-for="item in postData"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
        <div class="function-button">
          <el-button type="primary">新建</el-button>
          <el-button type="info">修改</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="model-message my-table">
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
const value = ref('')

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
      .function-select {
        display: flex;
        align-items: center;
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
      .function-button {
        display: flex;
        align-items: center;
      }  
    }
    .model-message {
      padding: 1vh;
      width: 100%;
      height: 92%;
    }
  }
}
</style>