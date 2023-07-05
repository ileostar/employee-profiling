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
              <use xlink:href="#icon-jixiaopinggu"></use>
            </svg>
            <span>绩效成绩</span>
          </el-menu-item>
          <el-menu-item index="1-4">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian"></use>
            </svg>
            <span>标签管理</span>
          </el-menu-item>
          <el-menu-item index="1-5">
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
import _ from 'lodash'
import { useRouter } from 'vue-router';
const router = useRouter()


const menu = _.cloneDeep(router.options.routes[0].children)
console.log("menu:",menu)



// console.log('menus:',menus[0].children[0]);




const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  background-color: #f7fafc;
  .el-menu-item.is-active {
    background-color: #ecf1f4;
  }
}
.el-menu,.el-sub-menu,.el-menu-item {
  background-color: #f7fafc;
}
</style>