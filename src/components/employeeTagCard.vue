<template>
  <div class="employee-tagcard">
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

</script>

<style lang="scss" scoped>
.employee-tagcard {
  background-color: #d3f3f1;
  border-radius: 2vh;
  header {
    height: 4vh;
    text-align: center;
    line-height: 4vh;font-weight: bold;
  }
  .driver {
    height: 1px;
    background-color: #ccc;
  }
}
</style>