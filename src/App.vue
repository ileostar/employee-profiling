<template>
	<!-- <RouterView class="root" /> -->
  <router-view  class="root" v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
      <component :is="Component" />
    </transition>
  </router-view>
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
  min-width: 1500px;
}
.icon {
	width: 1.6em;
	height: 1.6em;
	margin-right: 2em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0.3;
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
}
</style>
