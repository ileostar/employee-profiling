<template>
    <div class="charts">   
        <h1 class="charts-title">数据展示</h1>   
        <div class="small-charts">
            <SmallChart></SmallChart>   
            <SmallChart></SmallChart>   
            <SmallChart></SmallChart>   
            <SmallChart></SmallChart>
        </div>
        <div class="big-charts">
            <PostChart></PostChart>
            <TagChart></TagChart>
        </div>
    </div>
</template>

<script setup lang="ts">
import SmallChart from './components/SmallChart.vue';
import TagChart from './components/TagChart.vue';
import PostChart from './components/PostChart.vue';
</script>

<style lang="scss" scoped>
.charts {
    display: flex;
    flex-direction: column;
    .charts-title {
        margin-bottom: 20px;
    }
    .small-charts {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .big-charts {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
</style>