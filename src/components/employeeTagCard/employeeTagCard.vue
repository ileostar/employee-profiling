<template>
  <div class="employee-tagcard" :style="{ 'background-color': props.color }">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="driver"></div>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
	color: {
		type: String,
		default: '#d3f3f1'
	}
})
</script>

<style lang="scss" scoped>
.employee-tagcard {
  border-radius: 2vh;
  border: 1px solid #ccc;
  header {
    height: 4vh;
    text-align: left;
    padding: 0 1vh;
    line-height: 4vh;
  }
  .driver {
    height: 1px;
    background-color: #ccc;
  }
  main {
    padding: .8vh;
  }
}
</style>