<template>
  <div class="model-modification common-layout">
		<h1 class="title">模型修改</h1>
		<div class="fenge"></div>
    <div class="model-modification-main">
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
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

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
  }
}
</style>