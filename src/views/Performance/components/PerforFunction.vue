<template>
    <div class="information-function">
        <div class="function-select">
            <el-dropdown>
                <span class="el-dropdown-link">
                  Dropdown List
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item divided>Action 2</el-dropdown-item>
                    <el-dropdown-item divided>Action 3</el-dropdown-item>
                    <el-dropdown-item divided>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.function-select {
    height: 3.2vh;
    width: 9vw;
    border: 1px solid #ebeef5;
    border-radius: 5px;
    text-align: center;
    
    .el-dropdown-link {
        cursor: pointer;
        color: #606266;
        display: flex;
        align-items: center;
        line-height: 3.2vh;

      }
      
}
</style>