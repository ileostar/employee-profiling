<template>
    <div class="employee-portrait">   
        <div class="employee-portrait-aside">
            <div class="portrait-aside-header">
                <p class="aside-title">员工</p>
                <el-input
                v-model="input3"
                class="w-50 m-2"
                size="small"
                placeholder="请输入员工姓名"
                :prefix-icon="Search"
                />
            </div>
            <div class="portrait-aside-body">
                111
            </div>
            <div class="portrait-aside-pagination">
                111
            </div>
        </div>
        <div class="employee-portrait-main common-layout">
            <h1 class="title">员工画像</h1>
            <div class="fenge"></div>
            <div class="main-content">
                <div class="content-left">
                    <div class="content-left-information">
                        <li>员工基本信息</li>
                    </div>
                    <div class="content-left-tag">
                        <li>画像特征</li>
                    </div>
                    <div class="content-left-introduction">
                        <li>个人简介</li>
                    </div>
                </div>
                <div class="content-right">
                    <div class="content-right-post">
                        <li>岗位特征分析</li>
                    </div>
                    <div class="content-right-matching">
                        <li>人岗匹配</li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input3 = ref('')
</script>

<style lang="scss" scoped>
.employee-portrait {
    display: flex;
    width: 86vw;
    .employee-portrait-aside {
        height: 93.5vh;
        width: 12.2vw;
        padding: 2vh;
        border-right: 2px solid #ebeef5;
        background-color: #f5f6f6;
        .portrait-aside-header {
            display: flex;
            flex-direction: column;
            height: 8vh;
            justify-content: space-between;
            margin-bottom: 2vh;
            .aside-title {
                font-size: 2vh;
            }
        }
        .portrait-aside-body {
            height: 85%;
        }
    }
    .employee-portrait-main {
        .main-content {
            display: flex;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            border-radius: 1vh;
            overflow: hidden;
            .content-left {
                border-right: 2px solid #ebeef5;
                
                .content-left-information{
                    height: 40%;
                }
                .content-left-tag{
                    height: 30%;
                }
                .content-left-introduction {
                    height: 30%;
                }
            }
            .content-right {
                .content-right-post {
                    height: 30%;
                }
                .content-right-matching {
                    height: 70%;
                }
            }
            .content-left,.content-right {
                height: auto;
                width: 50%;
                padding: 2vh;
            }
        }
    }
}
</style>