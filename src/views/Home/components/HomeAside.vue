<template>
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yonghuweihu"></use>
              </svg>
            <span>信息维护</span>
          </template>
          <el-menu-item index="1-1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-a-007_shujufenxi"></use>
            </svg>
            <span>数据展示</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuangongguanli"></use>
            </svg>
            <span>员工信息</span>
          </el-menu-item>
          <el-menu-item index="1-3">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian"></use>
            </svg>
            <span>标签管理</span>
          </el-menu-item>
          <el-menu-item index="1-4">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhanghaoguanli1"></use>
            </svg>
            <span>账号管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <template #title>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghuhuaxiang1"></use>
            </svg>
            <span>员工画像</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghuhuaxiang"></use>
            </svg>
            <span>岗位画像</span>
          </template>
          <el-menu-item index="3-1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gangweijibie"></use>
            </svg>
            <span>总体画像</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gangweiguanli"></use>
            </svg>
            <span>岗位画像</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gangweixinxi"></use>
            </svg>
            <span>人岗匹配</span>
        </el-menu-item>
      </el-menu>
</template>

<script setup lang="ts">
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>

</style>