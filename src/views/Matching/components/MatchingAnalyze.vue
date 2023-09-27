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
					<el-form-item class="select" prop="post">
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
                  <el-table-column prop="number" label="岗位编号" width="70" />
                  <el-table-column prop="post" label="岗位名称" width="90" />
                  <el-table-column prop="factor" label="员工匹配系数" width="90" />
                  <el-table-column prop="max" label="岗位最高匹配系数" width="115" />
                  <el-table-column prop="min" label="岗位最低匹配系数" width="115" />
                  <el-table-column prop="avg" label="平均匹配系数"  width="115"/>
                </el-table>
              </div>
              <h3>
                <span>标签匹配分析&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#64b3ae">{{emloyeeNumberOptions.length>1?'其他员工:':''}}</span></span>
                <el-select v-if="emloyeeNumberOptions.length>1" style="width: 35%;" v-model="currentEmloyeeNumber"  @change="changeEmloyeeNumber" placeholder="选择其他员工">
                  <el-option
                    v-for="item in emloyeeNumberOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </h3>
              <div class="personPostAnalyze">
                <employeeTagCard class="box-card-content">
                  <template v-slot:header>
                    <p>> {{currentTagAnalyzeResult.post}}优秀画像</p>
                  </template>
                  <template v-slot:default>
                    <el-tag class="ml-2" v-for="item in currentHandleTagAnalyzeResult" :key="item" type="info">
                      <p :title="item">{{handleStringLength(item)}}</p>
                    </el-tag>
                  </template>
                </employeeTagCard>
                <employeeTagCard class="box-card-content second">
                  <template v-slot:header>
                    <p>> {{currentTagAnalyzeResult.name}}优秀画像</p>
                  </template>
                  <template v-slot:default>
                    <el-tag class="ml-2" v-for="item in currentHandleTagEmployeeAnalyzeResult" :key="item" type="info">
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
              scrollbar-always-on
              >
              <el-table-column fixed prop="number" label="员工编号" width="80" />
              <el-table-column prop="name" label="员工姓名" width="90" />
              <el-table-column prop="presentlyPost" label="目前岗位" width="90" />
              <el-table-column prop="scores" sortable label="月度绩效" width="110" />
              <el-table-column prop="factor" sortable label="与当前岗位匹配度" />
            </el-table>
          </template>
				</noResultYet>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'
import employeeTagCard from '@/components/employeeTagCard/employeeTagCard.vue'
import api from '@/api/api'
import { ElMessage, FormInstance } from 'element-plus'
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import { useMatchingStore } from '@/stores/Matching'
import * as _ from 'lodash'

const matchingStore = useMatchingStore()
const employeeStore = useEmployeeStore()
const { createdTime } = storeToRefs(employeeStore)
const { PersonPostTableData,formPersonPost,emloyeeNumberOptions,currentEmloyeeNumber,currentTagAnalyzeResult,currentPostMatchingTable,formPostMatching } = storeToRefs(matchingStore)
// 控制结果页面显示，没有数据的时候显示空
const analyzePersonPost = ref(false)
const analyzePostMatching = ref(false)

onMounted(() => {
	saveState()
})

const saveState = () => {
	if(!_.isEmpty(currentTagAnalyzeResult.value)){
		analyzePersonPost.value = true
	} 
	if(!_.isEmpty(currentPostMatchingTable.value)){
		analyzePostMatching.value = true
	}
}

const currentHandleTagAnalyzeResult = ref<Array<string>>([])
const currentHandleTagEmployeeAnalyzeResult = ref<Array<string>>([])

// 重新排序，字符少的排在前面
watchEffect(() => {
	currentHandleTagAnalyzeResult.value = currentTagAnalyzeResult.value.postTag.sort(function(a, b) {
		return  b!.length-a!.length;
	}) as string[]
	currentHandleTagEmployeeAnalyzeResult.value = currentTagAnalyzeResult.value.employeeTag.sort(function(a, b) {
		return  b!.length-a!.length;
	}) as string[]
})

// 处理字符串长度
const handleStringLength = (item:string) => {
	// 定义字符串和长度限制
	const maxLength = 15;
	const ellipsis = '...';
	let halfLength = 0;

	// 检查字符串长度并进行省略
	if (item.length > maxLength) {
		// 超过最大长度，省略到最大长度的一半
		halfLength = Math.floor(maxLength);
		item = item.substring(0, halfLength) + ellipsis;
	} else if (item.length > maxLength / 2) {
		// 在一半长度和最大长度之间，省略到最大长度的一半
		halfLength = Math.floor(maxLength / 2);
		item = item.substring(0, halfLength) + ellipsis;
	}

	return item
}

// 人岗匹配切换编号分析表单
const changeEmloyeeNumber = async () => {
	const res2 = await api.getPostFeaturesByNumberAndPost({createdTime:createdTime.value,number:Number(currentEmloyeeNumber.value),post:formPersonPost.value.post})

	if(res2.data.state === 200){
		currentTagAnalyzeResult.value.post = formPersonPost.value.post
		currentTagAnalyzeResult.value.name = formPersonPost.value.name
		currentTagAnalyzeResult.value.employeeTag = res2.data.data.employeeGoodFeaturesMessage.filter( (item:string) => item != null)
		currentTagAnalyzeResult.value.postTag = res2.data.data.postGoodFeaturesMessage
	}  
}

// 人岗匹配分析表单
const ruleFormRef = ref<FormInstance>()
const ruleFormPersonPost = reactive({
	name: { required: true, message: '请输入员工姓名', trigger: 'blur'
	},
	post: { required: true, message: '请输入岗位名称', trigger: 'blur' },
})

// 岗位匹配分析表单
const ruleMatchingFormRef = ref<FormInstance>()
const ruleFormPostMatching = reactive({
	post: { required: true, message: '请输入岗位名称', trigger: 'blur' },
})

// 提交人岗匹配分析表单
const onSubmitPersonPost =(formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await api.getEmployeeAndPostMatching({ ...formPersonPost.value,createdTime: createdTime.value })
			if(res.data.state === 200) {
				analyzePersonPost.value = true
				const log = res.data.data?.map((item: { number: any; post: any; min: any; max: any; factor: any; avg: any }) => {
					const { number, post, min, max, factor, avg } = item
					return {
						number,
						max: Number(max).toFixed(2),
						min: Number(min).toFixed(2),
						factor: Number(factor).toFixed(2),
						avg: Number(avg).toFixed(2),
						post,
						name: formPersonPost.value.name
					}
				})
				PersonPostTableData.value = [...log]

				currentEmloyeeNumber.value = res.data.data[0]?.number

				emloyeeNumberOptions.value = res.data.data.map((item: { number: any; post: any; min: any; max: any; factor: any; avg: any }) => {
					return {
						value: item.number,
						label: item.number
					}
				})
				const res2 = await api.getPostFeaturesByNumberAndPost({createdTime:createdTime.value,number:Number(currentEmloyeeNumber.value),post:formPersonPost.value.post})

				if(res2.data.state === 200){
					currentTagAnalyzeResult.value.post = formPersonPost.value.post
					currentTagAnalyzeResult.value.name = formPersonPost.value.name
					currentTagAnalyzeResult.value.employeeTag = res2.data.data.employeeGoodFeaturesMessage.filter( (item:string) => item != null)
					currentTagAnalyzeResult.value.postTag = res2.data.data.postGoodFeaturesMessage
				} else {
					ElMessage.error(res.data.message)
				}
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
			const res = await api.getEmployeeAndPostSuit({ ...formPostMatching.value,createdTime: createdTime.value })
			if(res.data.state === 200) {
				analyzePostMatching.value = true
				currentPostMatchingTable.value = res.data.data.map((items: { [x: string]: any; factor: any; scores: any })=>{
					const { factor,scores,...item} = items
					return {
						factor: Number(factor).toFixed(2),
						scores: Number(scores).toFixed(2),
						...item
					}
				})
			} else {
				ElMessage.error(res.data.message)
			}
		} else {
			ElMessage.error('请正确填写表单！')
			return false
		}
	})
}

// 销毁前清空
onUnmounted(() => {
	analyzePersonPost.value= false
	analyzePostMatching.value = false
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
  :deep(.el-input,.el-input--suffix) {
    width: 100%;
    height: 4.5vh;
    font-size: 2vh;
    line-height: 4.5vh;
  }
	.content-left {
		border-right: 2px solid #ebeef5;

		.content-left-information {
			height: 17%;
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
          .el-select {
            padding-left: 1vw;
          }
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
            margin-right: .2vw;
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
        :deep(.el-form-item__label) {
          font-size: 2vh;
        }
					.el-button {
						width: 100%;
						height: 4.5vh;
						font-size: 2vh;
						border: none;
						background-color: #4e8984;
					}

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
@/stores/matching