<template>
	<div class="userInfos">
		<div class="user-avatar">
      <el-upload class="avatar" action="#" list-type="picture-card" :auto-upload="false">
        <img :src="infos.avatar" alt="">
    
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
      </el-upload>
    
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
			<el-button type="info" @click="editUserInfos">提交</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import api from '@/api/api'
import { useUsersStore } from '@/stores/users'
import { ElMessage, UploadFile } from 'element-plus'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const userStore = useUsersStore()
const { infos } = storeToRefs(userStore)

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
	console.log(file)
}

onMounted(() => {
	console.log(infos.value.avatar);
  
})

const handlePictureCardPreview = (file: UploadFile) => {
	dialogImageUrl.value = file.url!
	dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
	console.log(file)
}
const drawer = defineProps(['drawer'])

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
