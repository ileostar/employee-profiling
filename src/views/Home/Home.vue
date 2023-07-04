<template>
    <el-container>
        <el-header>
            <HomeHeader></HomeHeader>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <HomeAside></HomeAside>
          </el-aside>
          <el-main>
            <HomeMain></HomeMain>
          </el-main>
        </el-container>
      </el-container>
</template>

<script setup lang="ts">
import HomeAside from './components/HomeAside.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeMain from './components/HomeMain.vue'

</script>

<style lang="scss" scoped>
.el-header,.el-aside {
  margin: 0;
  padding: 0;
}
.el-header {
  height: 45px;
  box-shadow: 0 5px 5px 0 rgb(0 0 0 / 5%);
}
.el-aside {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>