<template>
    <div class="small-chart">
        <img class="small-icon" :src="props.image" alt="">
        <div class="content">
            <div class="chart-text"> 
                <div class="title">111</div>
                <p class="text">员工数</p>
            </div>
            <div class="chart">           
                <img class="chart" :src="props.chart" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['image','chart'])
</script>

<style lang="scss" scoped>
.small-chart {
    display: flex;
    width: 19.5vw;
    height: 16vh;
    background-color: #fff;
    box-shadow: 3px 3px 8px 3px rgb(29 35 41 / 13%);
    border-radius: 3px;
    padding: 1.5vw;
    align-items: center;
    .small-icon {
        height: 8vh;
    }
    .content {
        display: flex;
        justify-content: space-between;
        margin-left: 1.5vw;
        width: 11vw;
        height: 8vh;
        align-items: center;
        .chart-text {
            display: flex;
            height: 6vh;
            flex-direction: column;
            justify-content: space-between;
            .title {
                font-size: 16px;
            }
            .text {
                font-size: 14px;
                color: #B2B2B2;
            }
        }
        .chart {
            height: 5vh;
        }
    }
}
</style>