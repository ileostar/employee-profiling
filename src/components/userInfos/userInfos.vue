<template>
    <div class="userInfos">
        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
            <span>Hi there!</span>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<style lang="scss" scoped>

</style>