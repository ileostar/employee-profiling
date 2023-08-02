<template>
    <div class="userInfos">     
        <div class="user-avatar">
            <el-avatar :src="circleUrl" />
        </div>
        <ul class="user-desc">
            <li>
                <p>用户名</p>
                <el-input v-model="infos.username"/>
            </li>
            <li>
                <p>权限</p>
                <el-input v-model="infos.role" disabled/>
            </li>
        </ul>
        <div class="user-fix-button">
            <el-button type="info" @click="editUserInfos">提交</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import api from '@/api/api';
import { useUsersStore } from '@/stores/users';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const userStore = useUsersStore()
const {infos} = storeToRefs(userStore)

const  circleUrl =ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const drawer = defineProps(['drawer'])

const editUserInfos = async () => {
    const fixData = {
        id:  userStore.infos.id as number,
        username: userStore.infos.username as string
    }
    api.updateByUsername(fixData).then((res)=>{
        console.log(res);
        if(res.data.state == 200){
            
            userStore.updatePassword(fixData.username)
            ElMessage.success("修改成功")
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
        .el-avatar {
            width: 7vw;
            height: 7vw;
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