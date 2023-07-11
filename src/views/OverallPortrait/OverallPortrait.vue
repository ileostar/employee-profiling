<template>
    <div class="overall-portrait common-layout">

        <h1 class="title">总体画像</h1>
        
        <div class="fenge"></div>
        <div class="overall-portrait-main">
            <OverallSelect></OverallSelect>
            <div class="overall-portrait-result">
                <li>分析结果</li>
            </div>
            <div class="overall-portrait-detail">
                <li>明细</li>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import OverallSelect from './components/OverallSelect.vue'
</script>

<style lang="scss" scoped>
.overall-portrait {
    padding: 3vh;
    .overall-portrait-main {
        height: 100%;
        width: 100%;
        overflow: hidden;
        .overall-portrait-select {
            height: 12%;
        }
        .overall-portrait-result {
            height: 28%;
        }
        .overall-portrait-detail {
            height: 60%;
        }
    }
}
</style>