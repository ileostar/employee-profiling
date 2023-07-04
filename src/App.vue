<script setup lang="ts">
</script>

<template>
    <RouterView class="root" />
</template>

<style lang="scss">
@import '@/assets/styles/reset.scss';
@import '@/assets/styles/common.scss';
@import '@/assets/styles/iconfont.scss';
#app, .root {
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
