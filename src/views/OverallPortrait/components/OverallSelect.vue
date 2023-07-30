<template>
    <div class="overall-portrait-select">
        <div class="overall-portrait-select-item">
            <p>单位</p>
            <el-select v-model="value" clearable placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
        </div>
        <div class="overall-portrait-select-item">
            <p>部门</p>
            <el-select v-model="value" clearable placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
        </div>
        <div class="overall-portrait-select-item">
            <p>性别</p>
            <el-select v-model="value" clearable placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
        </div>
        <div class="overall-portrait-select-item">
            <p>年龄段</p>
            <el-select v-model="value" clearable placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
        </div>
        <div class="overall-portrait-select-item">
            <p>学历</p>
            <el-select v-model="value" clearable placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
        </div>  
        <el-button type="info">分析</el-button>
        <div class="overall-portrait-select-time">
            <el-select v-model="value" clearable placeholder="选择时间段">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style lang="scss" scoped>
.overall-portrait-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .overall-portrait-select-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            margin-right: 0.7vw;
        }
        .el-select {
            width: 8vw;

        }
    }
    .overall-portrait-select-time {       
        display: flex;
        align-items: center;
        .el-select {
            width: 14vw;
        }
    }
}
</style>