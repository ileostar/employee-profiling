<template>
    <div class="MatchingAnalyze"> 
        <div class="content-left">
            <div class="content-left-information">
                <li>人岗匹配分析</li>    
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="formInline.user" placeholder="输入员工姓名" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formInline.user" placeholder="输入岗位名称" clearable />
                    </el-form-item>
                    <el-form-item>
                      <el-select
                        v-model="formInline.region"
                        placeholder="查询方式"
                        clearable
                      >
                        <el-option  label="精准查询" value="jingzhun" />
                        <el-option label="模糊查询" value="mohu" />
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交分析</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="content-left-result">
                <p>> 分析结果</p>
            </div>
        </div>
        <div class="content-right">
            <div class="content-right-post">
                <li>岗位匹配分析</li>    
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="输入岗位名称：">
                        <el-input v-model="formInline.user" placeholder="岗位名称" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交分析</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="content-right-matching">
                <p>> 根据岗位筛选复合人员</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: 'jingzhun',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped>

.MatchingAnalyze {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    border-radius: 1vh;
    overflow: hidden;
    .content-left {
        border-right: 2px solid #ebeef5;
        
        .content-left-information{
            height: 28%;
            .el-form  {
                margin: 3vh 0;
                height: 100%;
                .el-form-item {
                    width: 25%;
                    .el-input,.el-button {
                        width: 100%;
                        height: 4.5vh;
                        font-size: 2vh;
                    }
                    .el-button {
                        border: none;
                        background-color: #4e8984;
                    }
                }
            }
        }
        .content-left-result{
            height: 70%;
        }
    }
    .content-right {
        .content-right-post {
            height: 20%;
            .el-form {
                margin: 3vh 3vh;
                
                .el-button {
                    border: none;
                    background-color: #4e8984;
                }
            }
        }
        .content-right-matching {
            height: 80%;
        }
    }
    .content-left,.content-right {
        height: auto;
        width: 50%;
        padding: 2vh;
    }
}
</style>