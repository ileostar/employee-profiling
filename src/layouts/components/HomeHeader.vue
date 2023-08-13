<template>
    <div class="home-header">
        <div class="home-header-left">
            <img src="@/assets/images/logo.png" alt="">
            <a href="#" class="home-header-link">基于员工画像的绩效结果评估研究</a>
        </div>
        <div class="home-header-right">
            <el-dropdown>
                <el-space class="home-header-space">
                    <el-avatar class="iconfont icon-guanliyuan"/>
                </el-space>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="drawer = true">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-drawer v-model="drawer" :with-header="false">
                <userInfos :drawer="drawer"></userInfos>
            </el-drawer>
        </div>
    </div>
</template>

<script setup lang="ts">
import userInfos from '@/components/userInfos/userInfos.vue';
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';
const drawer = ref(false);
const userStore = useUsersStore();

const handleLogout= ()=> {
	setTimeout(()=>{
		userStore.clearToken();
		window.location.replace('/login');
	}, 500);
};

</script>

<style lang="scss" scoped>
.home-header {
    box-sizing: border-box;
    width: 100%;
    height: 6.5vh;
    padding: 1vh 2vh;
    background-image: linear-gradient(to right,#7e819f, #37827d);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .home-header-left {
        display: flex;
        align-items: center;
        img {
            width: 4vh;
            height: 4vh;
            margin-right: 1.5vh;
        }
        .home-header-link {
            color: aliceblue;
            font-size: 2.3vh;
            cursor: pointer;
            text-decoration: none;
            &:hover {
                color: #fff;
            }
        }
    }
    .home-header-right {
        .home-header-space {
          cursor:pointer;
        }
        .el-avatar {
            font-size: 3vh;
            color: black;
            background-color: #fff;
            height: 4vh;
            width: 4vh;
        }
    }
}
</style>