<template>
  <div class="employee-info  common-layout">
    <h1 class="title">员工画像</h1>
    <div class="fenge"></div>
    <div class="main-content">
        <div class="content-left">
            <div class="content-left-information">
                <li>员工基本信息</li>   
                <el-descriptions align="center" border size="small" :column="3">
                  <el-descriptions-item label="姓名">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="性别">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="层级">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="部门">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="岗位">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="单位">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="年龄">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="工龄">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="员工编号">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="学历">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="专业">Suzhou</el-descriptions-item>
                  <el-descriptions-item label="是否中共党员">Suzhou</el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="content-left-tag">
                <li>画像特征</li>
                <div class="content-left-tag-content">   
                  <el-tag class="ml-2" v-for="tag in tags" :key="tag" type="info">{{ tag }}</el-tag>
                  <el-tag class="more" v-if="tags.length > 10" type="warning">查看全部</el-tag>
                </div>
            </div>
            <div class="content-left-introduction">
                <li>个人简介</li>
                <el-card shadow="hover">
                    <p>
                      本人名为张三，今年30岁，已加入中国共产党现在所处的岗位是客户专员，部门是营销部，专业是工商管理，有体育特长。有QC项日获奖经历。是省局创客工作室成员，考过计算机二级证书和三级营销师、经济师。
                    </p>
                </el-card>
            </div>
            <div class="content-right-post">
                <li>岗位特征分析</li>
                <div class="content-right-post-content">
                  <p>对绩效影响较大字段：</p>
                  <p>能力提升建议：</p>
                </div>
            </div>
        </div>
        <div class="content-right">
            <div class="content-right-matching">
                <li>人岗匹配</li>
                <div class="content-right-matching-content">     
                  <div class="content-right-matching-box1">
                    <p>该员工与当前岗位匹配分析：</p>
                    <div class="box1-card">
                      <div class="box1-card-left">
                        <p>88.8%</p>
                      </div>
                      <div class="box1-card-right">
                        <div class="card-information-header">
                          <el-icon><CaretRight /></el-icon>
                          <p>{{postName}}</p>
                        </div>
                        <p class="card-information-content">
                          该岗位优秀画像特征：{{ postIntroductInfo }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="content-right-matching-box2">
                    <p>该员工与当前岗位优秀标签对比：</p>
                    <div class="box2-card">
                      <employeeTagCard class="box2-card-content">
                        <template v-slot:header>
                          <p>> 当前岗位优秀标签</p>
                        </template>
                        <template v-slot:default>
                          <el-tag class="ml-2" type="info">Tag 3</el-tag>
                        </template>
                      </employeeTagCard>
                      <employeeTagCard class="box2-card-content second">
                        <template v-slot:header>
                          <p>> 该员工对应标签情况</p>
                        </template>
                        <template v-slot:default>
                          <el-tag class="ml-2" type="info">Tag 3</el-tag>
                        </template>
                      </employeeTagCard>
                    </div>
                  </div>
                  <div class="content-right-matching-box3">
                    <p>据模型分析，与当前员工匹配度高的岗位有：</p>
                    <div class="box3-table">  
                      <el-table :data="tableData" :header-cell-style="{background:'#97c1be',color: '#fff' }" border  size="small">
                        <el-table-column prop="postName" label="岗位名" />
                        <el-table-column prop="matchingNumber" label="匹配系数" width="75" />
                        <el-table-column prop="maxMatching" label="最大匹配值" width="88" />
                        <el-table-column prop="minMatching" label="最小匹配值"  width="88" />
                        <el-table-column prop="averageMatching" label="平均值"/>
                      </el-table>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import employeeTagCard from '@/components/employeeTagCard/employeeTagCard.vue'

const tags = ref(['标签1', '标签2', '标签3', '标签4', '标签2', '标签3', '标签4', '标签2', '标签3', '标签4', '标签2', '标签3', '标签4', '标签2', '标签3', '标签4'])
const postName = ref('会计师')
const postIntroductInfo = ref('有QC项目获奖情况、有体育特长、初级经济师、中共党员、有文学特长、有艺术特长')
const tableData = [
	{
		postName: '会计师',
		matchingNumber: '86.3',
		maxMatching: '90.3',
		minMatching: '72.3',
		averageMatching: '86.3',
	},{
		postName: '会计师',
		matchingNumber: '86.3',
		maxMatching: '90.3',
		minMatching: '72.3',
		averageMatching: '86.3',
	},{
		postName: '会计师',
		matchingNumber: '86.3',
		maxMatching: '90.3',
		minMatching: '72.3',
		averageMatching: '86.3',
	},{
		postName: '会计师',
		matchingNumber: '86.3',
		maxMatching: '90.3',
		minMatching: '72.3',
		averageMatching: '86.3',
	},{
		postName: '会计师',
		matchingNumber: '86.3',
		maxMatching: '90.3',
		minMatching: '72.3',
		averageMatching: '86.3',
	}
]
</script>

<style lang="scss" scoped>
.employee-info {
  width: 100%;
  .main-content {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    border-radius: 1vh;
    overflow: hidden;
    li {
      font-size: .6vh;
      font-weight: bold;
    }
    .content-left {
        border-right: 2px solid #ebeef5;
        
        .content-left-information{
            .el-descriptions {
              padding: 2vh 0;
            }
        }
        .content-left-tag{
            .content-left-tag-content {
              padding: 1vh;
              .el-tag  {
                margin: .5vh;
                border-radius: 1.2vh;
              }
              .ml-2,.more {
                  color: #fff;
                  background-color: #64b3ae;
              }
              .more {
                cursor: pointer;
              }
            }
        }
        .content-left-introduction {
            padding: 1vh 0;
            li {
              margin-bottom: 1vh;
            }
            .el-card {
              height: 100%;
            }
        }
        .content-right-post {
            display: flex;
            flex-direction: column;
            height: 20%;
            .content-right-post-content {
              padding-top: 1vh;
              height: 100%;
              p {
                font-size: .6vh;
                overflow: hidden;
                height: 45%;
              }
            }
        }
    }
    .content-right {
        .content-right-matching {
            display: flex;
            flex-direction: column;
            height: 80%;
            .content-right-matching-content {
              display: flex;
              flex-direction: column;
              height: 100%;
              padding: 1vh 1.5vw 0;
              .content-right-matching-box1 {
                height: 25%;
                overflow: hidden;
                .box1-card {
                  overflow: hidden;
                  margin: 1.2vh 2vh 0;
                  display: flex;
                  height: 70%;
                  border-radius: 10vh;
                  border: 1px solid #74777d;
                  .box1-card-left {
                    display: flex;
                    overflow: hidden;
                    justify-content: center;
                    align-items: center;
                    padding: 1vh 2vh;
                    width: 30%;
                    background-color:#37827d;
                    color: #fff;
                    p {
                      font-size: 3vh;
                    }
                  }
                  .box1-card-right {
                    overflow: hidden;
                    padding: 1vh 2vh;
                    .card-information-header {
                      display: flex;
                      overflow: hidden;
                      align-items: center;
                    }
                    .card-information-content {
                      padding-top: .3vh;
                      overflow: hidden;
                      text-overflow:ellipsis;
                      -webkit-line-clamp: 2;
                      word-wrap: break-word;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      color: #666565;
                    }
                  }
                }
              }
              .content-right-matching-box2 {
                flex: 1;
                .box2-card {
                  display: flex;
                  padding: 1.5vh .8vw 0;
                  height: 100%;
                  .el-tag {
                    color: #fff;
                    background-color: #64b3ae;
                    border-radius: 1.2vh;
                  }
                  .box2-card-content {
                    height:85%;
                    width: 15vw;
                  }
                  .second {  
                    margin-left: 2vh;
                  }
                }
              }
              .content-right-matching-box3 {
                height: 25%;
                .box3-table {
                  padding-top: 1.5vh;
                  .el-table {
                    border-radius: 1.4vh;
                  }
                }
              }
              p {
                text-indent: 1vh;
                font-size: .6vh;
              }
            }
        }
    }
    .content-left,.content-right {
        height: auto;
        width: 50%;
        padding: 2vh;
    }
  }

}
</style>