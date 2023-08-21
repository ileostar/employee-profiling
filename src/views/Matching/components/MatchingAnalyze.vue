<template>
	<div class="MatchingAnalyze">
		<div class="content-left">
			<div class="content-left-information">
				<li>人岗匹配分析</li>
				<el-form 
          ref="ruleFormRef"
          :inline="true" 
          :model="formPersonPost" 
          class="demo-form-inline" 
          :rules="ruleFormPersonPost"
          >
					<el-form-item prop="name">
						<el-input
							v-model="formPersonPost.name"
							placeholder="输入员工姓名"
							clearable
						/>
					</el-form-item>
					<el-form-item prop="post">
						<el-select
							v-model="formPersonPost.post"
							placeholder="输入岗位名称"
							clearable
						>
            <el-option label="客户专员" value="客户专员" />
            <el-option label="信息专员" value="信息专员" />
            <el-option label="市场经理" value="市场经理" />
            <el-option label="综合管理员" value="综合管理员" />
            <el-option label="终端专员" value="终端专员" />
            </el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitPersonPost(ruleFormRef)">提交分析</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-left-result">
				<p>> 分析结果</p>
          <noResultYet size="400" :isShow="!analyzePersonPost">
          <template v-slot:default>
            <div class="analyzePersonPost-content">
              <h3>人岗匹配度分析</h3>
              <div class="personPostTable">
                <el-table :data="PersonPostTableData" border size="small" stripe style="width: 99%">
                  <el-table-column prop="name" label="员工姓名" width="70"/>
                  <el-table-column prop="post" label="岗位名称" width="70" />
                  <el-table-column prop="employeeNumber" label="员工匹配系数" width="90" />
                  <el-table-column prop="postMaxNumber" label="岗位最高匹配系数" width="115" />
                  <el-table-column prop="postMinNumber" label="岗位最高匹配系数" width="115" />
                  <el-table-column prop="averageNumber" label="平均匹配系数"/>
                </el-table>
              </div>
              <h3>标签匹配分析</h3>
              <div class="personPostAnalyze">
                <employeeTagCard class="box-card-content">
                  <template v-slot:header>
                    <p>> {{currentTagAnalyzeResult.post}}优秀画像</p>
                  </template>
                  <template v-slot:default>
                    <el-tag class="ml-2" v-for="item in currentTagAnalyzeResult.postTag" :key="item" type="info">
                      <p :title="item">{{item}}</p>
                    </el-tag>
                  </template>
                </employeeTagCard>
                <employeeTagCard class="box-card-content second">
                  <template v-slot:header>
                    <p>> {{currentTagAnalyzeResult.name}}</p>
                  </template>
                  <template v-slot:default>
                    <el-tag class="ml-2" v-for="item in currentTagAnalyzeResult.employeeTag" :key="item" type="info">
                      <p :title="item">{{item}}</p>
                    </el-tag>
                  </template>
                </employeeTagCard>
              </div>
            </div>
          </template>
        </noResultYet>
			</div>
		</div>
		<div class="content-right">
			<div class="content-right-post">
				<li>岗位匹配分析</li>
				<el-form
          ref="ruleMatchingFormRef"
          class="demo-form-inline"
          :inline="true" 
          :model="formPostMatching" 
          :rules="ruleFormPostMatching" 
          >
					<el-form-item label="输入岗位名称：" prop="post">
						<el-select
							v-model="formPostMatching.post"
							placeholder="岗位名称"
							clearable
						>
            <el-option label="客户专员" value="客户专员" />
            <el-option label="信息专员" value="信息专员" />
            <el-option label="市场经理" value="市场经理" />
            <el-option label="综合管理员" value="综合管理员" />
            <el-option label="终端专员" value="终端专员" />
            </el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitPostMatching(ruleMatchingFormRef)">提交分析</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-right-matching">
				<p>> 根据岗位筛选复合人员</p>
				<noResultYet size="400" :isShow="!analyzePostMatching">
					<template v-slot:default>
            <el-table 
              class="PostMatchingTable"
              :default-sort="{ prop: 'factor', order: 'descending' }"
              :data="currentPostMatchingTable" 
              style="width: 100%"
              >
              <el-table-column fixed prop="number" label="员工编号" width="80" />
              <el-table-column prop="name" label="员工姓名" width="90" />
              <el-table-column prop="post" label="目前岗位" width="90" />
              <el-table-column prop="scores" sortable label="月度绩效" width="110" />
              <el-table-column prop="factor" sortable label="与当前岗位匹配度"/>
            </el-table>
          </template>
				</noResultYet>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'
import employeeTagCard from '@/components/employeeTagCard/employeeTagCard.vue'
import api from '@/api/api'
import { ElMessage, FormInstance } from 'element-plus'
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import { useMatchingStore } from '@/stores/Matching'

const matchingStore = useMatchingStore()
const employeeStore = useEmployeeStore()
const { createdTime } = storeToRefs(employeeStore)
const { PersonPostTableData } = storeToRefs(matchingStore)
// 控制结果页面显示，没有数据的时候显示空
const analyzePersonPost = ref(false)
const analyzePostMatching = ref(false)

// 人岗匹配分析表单
const ruleFormRef = ref<FormInstance>()
const formPersonPost = reactive({
	name: '',
	post: '',
})
const ruleFormPersonPost = reactive({
	name: { required: true, message: '请输入员工姓名', trigger: 'blur'
	},
	post: { required: true, message: '请输入岗位名称', trigger: 'blur' },
})
// 保存人岗匹配分析结果
const currentTagAnalyzeResult = ref({
	name: '',
	post: '',
	employeeTag: [],
	postTag: [],
})

// 岗位匹配分析表单
const ruleMatchingFormRef = ref<FormInstance>()
const formPostMatching = reactive({
	post: ''
})
const ruleFormPostMatching = reactive({
	post: { required: true, message: '请输入岗位名称', trigger: 'blur' },
})

type Infos = {
	number: '',
	name: '',
	post: '',
	scores: '',
	factor: ''
  [key: string]: unknown
}
// 保存岗位匹配分析结果
const currentPostMatchingTable = ref<Array<Infos>>([])

// 提交人岗匹配分析表单
const onSubmitPersonPost =(formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await api.getEmployeeAndPostMatching({ ...formPersonPost,createdTime: createdTime.value })
			const res2 = await api.getPostFeatures({createdTime:createdTime.value,name:formPersonPost.name})
			if(res.data.state === 200 && res2.data.state === 200) {
				analyzePersonPost.value = true
				PersonPostTableData.value = []
				PersonPostTableData.value.push({
					name: formPersonPost.name,
					post: formPersonPost.post,
					employeeNumber: res.data.data[formPersonPost.post][0].toFixed(2),
					postMaxNumber: res.data.data[formPersonPost.post][1].toFixed(2),
					postMinNumber: res.data.data[formPersonPost.post][2].toFixed(2),
					averageNumber: res.data.data[formPersonPost.post][3].toFixed(2),
				})
				console.log('标签匹配情况：',res.data.data.employeeGoodFeaturesMessage);
				currentTagAnalyzeResult.value.post = formPersonPost.post
				currentTagAnalyzeResult.value.name = formPersonPost.name
				currentTagAnalyzeResult.value.employeeTag = res2.data.data.employeeGoodFeaturesMessage.filter( (item:string) => item != null)
				currentTagAnalyzeResult.value.postTag = res2.data.data.postGoodFeaturesMessage
			}else {
				ElMessage.error('请正确填写表单！')
				return false
			}
		}
	})
}

// 提交岗位匹配分析表单
const onSubmitPostMatching = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await api.findPostFactorDesc({ ...formPostMatching,createdTime: createdTime.value })
			if(res.data.state === 200) {
				analyzePostMatching.value = true
				currentPostMatchingTable.value = res.data.data
			}else {
				ElMessage.error('请正确填写表单！')
				return false
			}
		}
	})
}

// 销毁前清空
onUnmounted(() => {
	analyzePersonPost.value= false
	analyzePostMatching.value = false
	PersonPostTableData.value = []
})
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

		.content-left-information {
			height: 20%;
			.el-form {
				margin: 3vh 0;
				height: 100%;
				.el-form-item {
					width: 25%;
					.el-input,
					.el-button {
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
		.content-left-result {
			height: 70%;
      .analyzePersonPost-content {
        margin: 2vh 2vh 0;
        h3 {
          margin: 2vh 0;
          font-weight: 400;
          border-left: .2vw solid #97c1be;
          padding-left: .5vw;
        }
      }
      .personPostAnalyze {
        display: flex;
        width: 100%;
        .el-tag {
            overflow: hidden;
          color: #fff;
          background-color: #64b3ae;
          border-radius: 1.2vh;
          p {
            max-width: 15vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: .5vw;
          }
        }
        
        .box-card-content {
          width: 50%;
          height: 30vh;
        }
        .second {
          margin-left: 2vh;
        }
      }
		}
	}
	.content-right {
		.content-right-post {
			.el-form {
				display: flex;
				height: 20%;
				margin: 3vh 3vh;

				.el-button {
					border: none;
					background-color: #4e8984;
				}
			}
		}
		.content-right-matching {
			height: 80%;
      .PostMatchingTable {
        margin-top: 2vh;
        height: 55vh;
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
</style>
