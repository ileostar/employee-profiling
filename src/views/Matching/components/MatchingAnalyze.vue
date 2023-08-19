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
						<el-input
							v-model="formPersonPost.post"
							placeholder="输入岗位名称"
							clearable
						/>
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
                <el-table :data="PersonPostTableData" border size="small" stripe style="width: 100%">
                  <el-table-column prop="name" label="员工姓名"/>
                  <el-table-column prop="post" label="岗位名称" width="70" />
                  <el-table-column prop="employeeNumber" label="员工匹配系数" width="90" />
                  <el-table-column prop="postMaxNumber" label="岗位最高匹配系数" width="120" />
                  <el-table-column prop="postMinNumber" label="岗位最高匹配系数" width="120" />
                  <el-table-column prop="averageNumber" label="平均匹配系数" width="100" />
                </el-table>
              </div>
              <h3>标签匹配分析</h3>
              <div class="personPostAnalyze">
                
              </div>
            </div>
          </template>
        </noResultYet>
			</div>
		</div>
		<div class="content-right">
			<div class="content-right-post">
				<li>岗位匹配分析</li>
				<el-form :inline="true" :model="formPostMatching" :rules="ruleFormPostMatching" class="demo-form-inline">
					<el-form-item label="输入岗位名称：" prop="post">
						<el-input
							v-model="formPostMatching.post"
							placeholder="岗位名称"
							clearable
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitPostMatching">提交分析</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-right-matching">
				<p>> 根据岗位筛选复合人员</p>
				<noResultYet size="400" :isShow="analyzePostMatching===''?true:false">
					<template v-slot:default>111</template>
				</noResultYet>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'
import api from '@/api/api'
import { ElMessage, FormInstance } from 'element-plus'
import { useEmployeeStore } from '@/stores/employee'
import { storeToRefs } from 'pinia'
import { useMatchingStores } from '@/stores/Matching'

const matchingStore = useMatchingStores()
const employeeStore = useEmployeeStore()
const { createdTime } = storeToRefs(employeeStore)
const { PersonPostTableData } = storeToRefs(matchingStore)
const ruleFormRef = ref<FormInstance>()
const analyzePersonPost = ref(false)
const analyzePostMatching = ref('')
const formPersonPost = reactive({
	name: '',
	post: '',
})

const ruleFormPersonPost = reactive({
	name: { required: true, message: '请输入员工姓名', trigger: 'blur'
	},
	post: { required: true, message: '请输入岗位名称', trigger: 'blur' },
})

const formPostMatching = reactive({
	post: '',
})

const ruleFormPostMatching = reactive({
	post: { required: true, message: '请输入岗位名称', trigger: 'blur' },
})

// 提交人岗匹配分析表单
const onSubmitPersonPost =(formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			const res = await api.getEmployeeAndPostMatching({ ...formPersonPost,createdTime: createdTime.value })
			if(res.data.state === 200) {
				analyzePersonPost.value = true
				PersonPostTableData.value.push({
					name: formPersonPost.name,
					post: formPersonPost.post,
					employeeNumber: res.data.data[formPersonPost.post][0],
					postMaxNumber: res.data.data[formPersonPost.post][1],
					postMinNumber: res.data.data[formPersonPost.post][2],
					averageNumber: res.data.data[formPersonPost.post][3].toFixed(2),
				})
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
				analyzePersonPost.value = res.data.data
			}else {
				ElMessage.error('请正确填写表单！')
				return false
			}
		}
	})
}

onUnmounted(() => {
	analyzePersonPost.value= false
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
      .el-table {
        margin-top: 2vh;
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
