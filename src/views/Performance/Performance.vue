<template>
    <div class="performance">
        <div class="performance-header">
            <h1>绩效成绩</h1> 
            <PerfoFunction></PerfoFunction>
        </div> 
        <div class="performance-content">
            <PerforTable></PerforTable>
        </div>
    </div>
</template>

<script setup lang="ts">

import PerforTable from './components/PerforTable.vue'
import PerfoFunction from './components/PerforFunction.vue'
</script>

<style lang="scss" scoped>
.performance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.performance-content {
    padding: 5px 5px;
    border: 2px solid #ebeef5;
    border-radius: 5px;
}
</style>