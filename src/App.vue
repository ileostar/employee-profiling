<template>
	<RouterView class="root" />
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/common.scss';
@import '@/styles/iconfont.scss';
#app,
.root {
	height: 100vh;
	width: 100vw;
}
.icon {
	width: 1.6em;
	height: 1.6em;
	margin-right: 2em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
