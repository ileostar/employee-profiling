<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<el-container>
		<el-header>
			<HomeHeader></HomeHeader>
		</el-header>
		<el-container>
			<el-aside>
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
.el-header,
.el-aside {
	margin: 0;
	padding: 0;
}
.el-header {
	height: 6.5vh;
	box-shadow: 0 5px 5px 0 rgb(0 0 0 / 5%);
}
.el-aside {
	width: 14vw;
	height: 100%;
	box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.el-main {
	padding: 0;
}
</style>
