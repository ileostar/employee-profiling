<template>
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <!-- 信息维护 -->
        <el-sub-menu v-for="item in maintenance" :key="item.path" :index="item.path">
          <template #title>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.meta?.icon"></use>
              </svg>
            <span>{{item.meta?.title}}</span>
          </template>
          <el-menu-item v-for="itemChild in item.children" :key="itemChild.path" :index="itemChild.path">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="itemChild.meta?.icon"></use>
            </svg>
            <span>{{ itemChild.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 员工画像 -->
        <el-menu-item :index="employeePortrait.path">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="employeePortrait.meta?.icon"></use>
          </svg>
          <span>{{ employeePortrait.meta?.title }}</span>
        </el-menu-item>
        
        <!-- 岗位画像 -->
        <el-sub-menu v-for="item in postPortrait" :key="item.path" :index="item.path">
          <template #title>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.meta?.icon"></use>
              </svg>
            <span>{{item.meta?.title}}</span>
          </template>
          <el-menu-item v-for="itemChild in item.children" :key="itemChild.path" :index="itemChild.path">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="itemChild.meta?.icon"></use>
            </svg>
            <span>{{ itemChild.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 人岗匹配 -->
        <el-menu-item :index="Matching.path">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="Matching.meta?.icon"></use>
          </svg>
          <span>{{ Matching.meta?.title }}</span>
        </el-menu-item>

      </el-menu>
</template>

<script setup lang="ts">
import * as _ from 'lodash';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

const menu = _.cloneDeep(router.options.routes[0].children)
// console.log("menu:",menu![0].children)

const maintenance = [menu![0]]
const employeePortrait = menu![1]
const postPortrait = [menu![2]]
const Matching = menu![3]

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