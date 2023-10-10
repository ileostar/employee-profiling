<template>
	<div class="employee-info common-layout">
		<h1 class="title">{{props.employee}}员工画像</h1>
		<div class="fenge"></div>
		<div class="main-content">
			<div class="content-left">
				<div class="content-left-information">
					<li>员工基本信息</li>
					<el-descriptions align="center" border size="small" :column="3">
						<el-descriptions-item label="姓名">{{employeeInfos.name}}</el-descriptions-item>
						<el-descriptions-item label="性别">{{employeeInfos.sex}}</el-descriptions-item>
						<el-descriptions-item label="员工编号">{{employeeInfos.number}}</el-descriptions-item>
						<el-descriptions-item label="单位">{{employeeInfos.unit}}</el-descriptions-item>
						<el-descriptions-item label="年龄">{{employeeInfos.age}}</el-descriptions-item>
						<el-descriptions-item label="烟草工作年限">{{employeeInfos.seniority}}</el-descriptions-item>
						<el-descriptions-item label="岗位">{{employeeInfos.post}}</el-descriptions-item>
						<el-descriptions-item label="学历">{{employeeInfos.degree}}</el-descriptions-item>
						<el-descriptions-item label="政治面貌">
							{{employeeInfos.status}}
						</el-descriptions-item>
					</el-descriptions>
				</div>
				<div class="content-left-tag">
					<li>画像特征</li>
					<div class="content-left-tag-content">
						<el-tag class="ml-2" v-for="tag in tags.slice(0,6)" :key="tag" type="info">
							{{ tag }}
						</el-tag>
						<el-tag class="more" v-if="tags.length > 10" type="warning"  @click="TagCenterDialogVisible = true">
							查看全部
						</el-tag>
					</div>
				</div>
				<div class="content-left-introduction">
					<li>个人简介</li>
					<el-card shadow="hover">
						<p>
							本人名为{{employeeInfos.name}}，今年{{employeeInfos.age}}岁，{{employeeInfos.status!='群众'?`目前是${employeeInfos.status}`:''}}现在所处的岗位是{{employeeInfos.post}}，我<span v-for="tag,index in tags.slice(0,6)" :key="tag">{{tag}}{{index===tags.slice(0,6).length-1?'...':','}}</span>
						</p>
					</el-card>
				</div>
				<div class="content-right-post">
					<li>岗位特征分析</li>
					<div class="content-right-post-content">
						<p :title="postTagEmployeeInfos?.postGoodFeaturesMessage.join('、')"><strong>对绩效影响较大字段：</strong>{{ postTagEmployeeInfos?.postGoodFeaturesMessage.join('、') }} </p>
						<p :title="postTagEmployeeInfos?.employeeBadFeaturesMessage.filter(item=>item!==null).join('、')"><strong>能力提升建议：</strong>{{ postTagEmployeeInfos?.employeeBadFeaturesMessage.filter(item=>item!==null).join('、') }}
            </p>
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
									<p>{{ currentEmployeeAndPostAnalyze?.factor}}</p>
								</div>
								<div class="box1-card-right">
									<div class="card-information-header">
										<el-icon><CaretRight /></el-icon>
										<p>{{employeeInfos.post}}</p>
									</div>
									<p class="card-information-content" :title="handlePostGoodFeaturesMessage?.join('、')">
										该岗位优秀画像特征：{{ handlePostGoodFeaturesMessage?.join('、') }}
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
                    <el-scrollbar max-height="18.8vh">
                      <el-tag class="ml-2" type="info" v-for="tag in handlePostGoodFeaturesMessage" :key="tag" >
                            <p :title="tag">{{tag}}</p>
                      </el-tag>
                    </el-scrollbar>
									</template>
								</employeeTagCard>
								<employeeTagCard class="box2-card-content second">
									<template v-slot:header>
										<p>> 该员工对应标签情况</p>
									</template>
									<template v-slot:default>
										<el-tag class="ml-2" type="info" v-for="tag in handleEmployeeGoodFeaturesMessage" :key="tag" :title="tag">
                      <p :title="tag as string">{{tag}}</p>
                    </el-tag>
									</template>
								</employeeTagCard>
							</div>
						</div>
						<div class="content-right-matching-box3">
							<p>据模型分析，与当前员工匹配度高的岗位有：</p>
							<div class="box3-table">
								<el-table
									:data="postCountFactors"
									:header-cell-style="{ background: '#97c1be', color: '#fff' }"
									border
									size="small"
								>
									<el-table-column prop="post" label="岗位名" />
									<el-table-column
										prop="factor"
										label="匹配系数"
										width="75"
									/>
									<el-table-column
										prop="max"
										label="最大匹配值"
										width="88"
									/>
									<el-table-column
										prop="min"
										label="最小匹配值"
										width="88"
									/>
									<el-table-column prop="avg" label="平均值" />
								</el-table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  <el-dialog
    v-model="TagCenterDialogVisible"
    :title="`${props.employee}全部标签`"
    width="50%"
    align-center
  >
    <el-tag class="ml-2" v-for="tag in tags" :key="tag" type="info">
      {{ tag }}
    </el-tag>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="TagCenterDialogVisible = false">退出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import employeeTagCard from '@/components/employeeTagCard/employeeTagCard.vue'
import { storeToRefs } from 'pinia'
import { postCountFactor, useEmployeeStore } from '@/stores/employee'

const employeeStore = useEmployeeStore()
const { portraitFeature:employeeInfos,tagEmployeeInfo:tags,postTagEmployeeInfos,postCountFactors } = storeToRefs(employeeStore)

const TagCenterDialogVisible = ref(false)
const props = defineProps(['employee'])


const postName = ref('市场经理')
const postIntroductInfo = ref<Array<string>>([
	'有QC项目获奖情况', 
	'有体育特长', 
	'初级经济师', 
	'有文学特长', 
	'有艺术特长',
	'近两年参与线下授课经历',
	'是否受到市局（公司）表彰',
])

// 员工对应情况
const employeeMatchingTag = ref<Array<string>>([])

const handlePostGoodFeaturesMessage = ref<Array<string>>()
const handleEmployeeGoodFeaturesMessage = ref<Array<string>>()
const currentEmployeeAndPostAnalyze = ref<postCountFactor>()

watchEffect(() => {
	employeeMatchingTag.value = tags.value.filter(tag => postIntroductInfo.value.includes(tag));
	handlePostGoodFeaturesMessage.value = postTagEmployeeInfos.value?.postGoodFeaturesMessage.sort((a,b) => b!.length-a!.length) as Array<string>
	handleEmployeeGoodFeaturesMessage.value = postTagEmployeeInfos.value?.employeeGoodFeaturesMessage.filter(item=>item!==null).sort((a,b) => b!.length-a!.length) as Array<string>
	currentEmployeeAndPostAnalyze.value = postCountFactors.value.find(item => item.post === postName.value)
})
</script>

<style lang="scss" scoped>
.employee-info {
	width: 100%;
	.main-content {
		display: flex;
		justify-content: space-between;
		height: 100%;
		width: 100%;
    overflow: hidden;
		border-radius: 1vh;
		li {
			font-size: 0.6vh;
			font-weight: bold;
		}
		.content-left {
			border-right: 2px solid #ebeef5;

			.content-left-information {
				.el-descriptions {
					padding: 2vh 0;
				}
			}
			.content-left-tag {
				.content-left-tag-content {
					padding: 1vh;
					.el-tag {
						margin: 0.5vh;
						border-radius: 1.2vh;
					}
					.ml-2,
					.more {
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
				height: 25%;
				.content-right-post-content {
					padding-top: 1vh;
					height: 100%;
					p {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            font-size: 0.6vh;
            overflow: hidden;
            margin-bottom: .3vh;
					}
          p:last-child {
            -webkit-line-clamp: 2;
          }
				}
			}
		}
		.content-right {
      overflow: hidden;
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
							margin: 1.2vh 1vh 0;
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
								width: 35%;
								background-color: #37827d;
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
									padding-top: 0.3vh;
									overflow: hidden;
									text-overflow: ellipsis;
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
						height: 50%;
						.box2-card {
							display: flex;
							padding: 1.5vh 0 0;
							height: 100%;
							.el-tag {
								color: #fff;
								background-color: #64b3ae;
								border-radius: 1.2vh;
							}
							.box2-card-content {
                overflow: hidden;
								height: 85%;
								width: 15vw;
                .el-tag {
                  overflow: hidden;
                  color: #fff;
                  background-color: #64b3ae;
                  border-radius: 1.2vh;
                  padding-left: 1px;
                  p {
                    max-width: 12.2vw;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 10px!important;
                  }
                }
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
						font-size: 0.5vh;
					}
				}
			}
		}
		.content-left,
		.content-right {
			height: auto;
			width: 50%;
			padding: 2vh;
		}
	}
}
.el-dialog {
  
  .el-tag {
    margin: 0.5vh;
    border-radius: 1.2vh;
  }
  .ml-2 {
    background-color: #64b3ae;
    color: #fff;
  }
}
</style>
