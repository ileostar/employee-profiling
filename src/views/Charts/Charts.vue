<template>
    <div class="charts">   
        <h1 class="charts-title">数据展示</h1>   
        <div class="small-charts">
            <SmallChart v-for="i in 4" :key="i" :image="image[i-1]" :chart="chart[i-1]"></SmallChart>
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

const image= ["src/assets/images/icon-1.png","src/assets/images/icon-2.png", "src/assets/images/icon-3.png", "src/assets/images/icon-4.png" ]
const chart= ["src/assets/images/chart-1.png","src/assets/images/chart-2.png", "src/assets/images/chart-3.png", "src/assets/images/chart-4.png" ]
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