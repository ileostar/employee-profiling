<template>
    <div class="information">
        <div class="information-header">
            <h1>员工信息</h1> 
            <InforFunction></InforFunction>
        </div> 
        <div class="information-content">
            <InforTable></InforTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import InforTable from './components/InforTable.vue'
import InforFunction from './components/InforFunction.vue'
</script>

<style lang="scss" scoped>
.information-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.information-content {
    padding: 5px 5px;
    border: 2px solid #ebeef5;
    border-radius: 5px;
}
</style>