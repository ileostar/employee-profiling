<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoading } from '@/stores/loading';
import load from '@/components/loading/loading.vue';

const loadingStore = useLoading()
const { loading: isshow } = storeToRefs(loadingStore)
</script>

<template>
  <div id="app">
    <RouterView class="root" />
    <load v-if="isshow"></load>
  </div>
</template>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/common.scss';
@import '@/styles/iconfont.scss';
#app,
.root {
	height: 100vh;
	width: 100vw;
}
</style>
