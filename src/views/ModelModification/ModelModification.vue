<template>
  <div class="model-modification common-layout">
		<h1 class="title">模型修改</h1>
		<div class="fenge"></div>
    <div class="model-modification-main">
      <div class="function">
        <div class="model-select">
          <p>全局模型切换</p>
          <el-select v-model="currentModelValue" @change="confirmSwitch(currentModelValue)" class="m-2" placeholder="模型切换">
            <el-option
              v-for="item in modelTotal"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <p style="margin-left: 1vw;color:  rgb(234, 46, 46); font-size: small;">
            (全局系统模型切换，会改变整个系统的值，会消耗一定时间，请谨慎切换！)
          </p>
        </div>
        <div class="function-button">
          <span style="margin-right: 1vw;color: gray; font-size:small;">模型操作：</span>
          <el-button type="primary" @click="dialogCreateVisible=true">新建</el-button>
          <el-button type="info" @click="dialogEditVisible=true">修改</el-button>
          <el-button type="danger" @click="dialogDeleteVisible=true">删除</el-button>
        </div>
      </div>
      <div class="model-message my-table">
        <div class="function-select">
          <div class="model-select">
            <p>查看模型</p>
            <el-select v-model="currentSelectModel" class="m-2" placeholder="选择模型"  @change="findModelInformation">
              <el-option
                v-for="item in modelTotal"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="post-select">
            <p>岗位切换</p>
            <el-select v-model="currentSelectPost" class="m-2" placeholder="选择岗位" @change="findModelInformation">
              <el-option
                v-for="item in postData"
                :key="item"
                :label="item"
                :value="item" 
              />
            </el-select>
          </div>
          <p style="margin-left: 1vw;color:  gray; font-size: small;">
            (查看各个系统模型的详情)
          </p>
        </div>
        <el-divider />
        <el-scrollbar max-height="62.5vh">
          <el-descriptions 
            direction="vertical"
            :column="3"
            border>
              <el-descriptions-item v-for="item of formField" :key="item" :label="item.label">  {{item.value}}
              </el-descriptions-item>
          </el-descriptions>
        </el-scrollbar>
      </div>
    </div>
    <CreatedDialog/>
    <EditDialog/>
    <DeleteDialog/>
  </div>
</template>

<script lang="ts" setup>
import CreatedDialog from './components/CreatedDialog.vue'
import EditDialog from './components/EditDialog.vue'
import DeleteDialog from './components/DeleteDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const postStore = usePostStore()
const modelStore = useModelStore()
const { postData } = storeToRefs(postStore)
const { modelTotal,formField,dialogCreateVisible,currentModel,dialogEditVisible,dialogDeleteVisible,currentModelValue,currentSelectModel,currentSelectPost, } = storeToRefs(modelStore)

onMounted(() => {
	if(currentSelectPost.value === '') {
		currentSelectPost.value = postData.value[0]
	}
	if(currentSelectModel.value === '') {
		currentSelectModel.value = currentModel.value
	}
	if(currentModelValue.value === '') {
		currentModelValue.value = currentModel.value
	}
	findModelInformation()
})

/**
 * Find model information.
 *
 * @return {undefined} No return value.
 */
const findModelInformation = () => {
	modelStore.updateFormField(currentSelectModel.value,currentSelectPost.value)
}

/**
 * Generates a confirmation dialog for switching.
 *
 * @param {string} current - the current value
 * @return {void} returns nothing
 */
const confirmSwitch = (current: string) => {
	ElMessageBox.confirm(
		'该过程可能会消耗一定时间，请确认您的操作?',
		'确认操作',
		{
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}
	)
		.then(async() => {
			const res = await api.chooseModel({filePath:current})
			if(res.status) {
				ElMessage({
					type: 'success',
					message: '切换成功',
				})
			}
			dialogDeleteVisible.value = false
		})
		.catch(async () => {
			const res = await api.findByModelProperties()
			if(res.status) {
				currentModelValue.value=res.data
			}
			ElMessage({
				type: 'info',
				message: '取消切换',
			})
		})
}
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
      .el-scrollbar {
        margin-top: -2vh;
      }
    }
  }
}
</style>
