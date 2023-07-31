<template>
    <div class="userInfos">     
        <div class="user-avatar">
            <el-avatar :src="circleUrl" />
        </div>
        <ul class="user-desc">
            <li>
                <p>用户名</p>
                <el-input v-model="input"/>
            </li>
            <li>
                <p>权限</p>
                <el-input v-model="input" disabled/>
            </li>
        </ul>
        <div class="user-fix-button">
            <el-button type="info">提交</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('')
const  circleUrl =ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
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