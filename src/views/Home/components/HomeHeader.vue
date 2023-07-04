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
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">

const handleLogout= ()=> {
  setTimeout(()=>{
    window.location.replace('/login')
  }, 500)
}
</script>

<style lang="scss" scoped>
.home-header {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    padding: 7.5px 20px;
    background-image: linear-gradient(to right,#7e819f, #37827d);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .home-header-left {
        display: flex;
        align-items: center;
        img {
            width: 23px;
            height: 25px;
            margin-right: 12px;
        }
        .home-header-link {
            color: aliceblue;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            &:hover {
                color: #fff;
            }
        }
    }
    .home-header-right {
        height: 100%;
        .el-avatar {
            font-size: 22px;
            color: black;
            background-color: #fff;
            height: 30px;
            width: 30px;
        }
    }
}
</style>