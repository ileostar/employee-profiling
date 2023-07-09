<template>
    <div class="employee-portrait">   
        <div class="employee-portrait-aside">
            <p class="aside-title">员工</p>
        </div>
        <div class="employee-portrait-main">
            <h1 class="title">员工画像</h1>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.employee-portrait {
    display: flex;
    width: 86vw;
    .employee-portrait-aside {
        height: 93.5vh;
        width: 11vw;
        padding: 2vh;
        border-right: 2px solid #ebeef5;
        background-color: #f5f6f6;
        .aside-title {
            font-size: 2vh;
        }
    }
    .employee-portrait-main {
        padding: 3vh;
    }
}
</style>