<template>
	<el-menu
		:default-active="route.path"
		class="el-menu-vertical-demo"
		@open="handleOpen"
		@close="handleClose"
		router
	>
  <el-scrollbar max-height="93.5vh">
		<!-- 信息维护 -->
		<el-sub-menu
      v-for="item in maintenance"
      :key="item.path"
      :index="item.path"
    >
      <template #title>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.meta?.icon"></use>
        </svg>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item
        v-for="itemChild in item.children"
        :key="itemChild.path"
        :index="itemChild.path"
      >
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
    <el-sub-menu
      v-for="item in postPortrait"
      :key="item.path"
      :index="item.path"
    >
      <template #title>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.meta?.icon"></use>
        </svg>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item
        v-for="itemChild in item.children"
        :key="itemChild.path"
        :index="itemChild.path"
      >
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

    <!-- 登记审批 -->
    <el-menu-item :index="ExamineApprove.path">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="ExamineApprove.meta?.icon"></use>
      </svg>
      <span>{{ ExamineApprove.meta?.title }}</span>
    </el-menu-item>
    
    <!-- 模型修改 -->
    <el-menu-item v-if="Auth()" :index="ModelModification.path">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="ModelModification.meta?.icon"></use>
      </svg>
      <span>{{ ModelModification.meta?.title }}</span>
    </el-menu-item>
  </el-scrollbar>
	</el-menu>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import * as _ from 'lodash'
const router = useRouter()
const route = useRoute()
const userStore = useUsersStore()

const { infos } = storeToRefs(userStore)

const menu = _.cloneDeep(router.options.routes[0].children)

// 权限过滤
const updatedObj = {
	...menu![0],
	children: menu![0].children?.filter((item) =>
		infos.value.role === '普通用户' ? item.name !== 'AccountManage' : true,
	),
}
const Auth = () => infos.value.role === '普通用户' ? false : true

const maintenance = [updatedObj]
const employeePortrait = menu![1]
const postPortrait = [menu![2]]
const Matching = menu![3]
const ModelModification = menu![4]
const ExamineApprove = menu![5]

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
  //将横向滚动条隐藏
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
  //这里我设置成了透明色,可以根据需求添加自己想要的颜色
  :deep(.el-scrollbar__thumb) {
    //可设置滚动条颜色
    background: transparent;
  }
	.el-menu-item.is-active {
		background-color: #ecf1f4;
	}
}
.el-menu,
.el-sub-menu,
.el-menu-item {
	background-color: #f7fafc;
}
.el-menu-item span,
.el-sub-menu span {
	font-size: 1vw;
  padding-left: 2.5vh;
}
.icon {
	width: 1.5vw;
	height: 1.5vw;
}
</style>
