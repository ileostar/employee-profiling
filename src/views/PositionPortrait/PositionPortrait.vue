<template>
	<div class="position-portrait">
		<div class="position-portrait-aside">
			<div class="portrait-aside-header">
				<p class="aside-title">岗位</p>
			</div>
      <el-divider />
			<div class="portrait-aside-body">
        <el-menu
          :default-active="postData[0]"
          class="el-menu-vertical-demo"
        >
          <el-menu-item v-for="item in postData" :key="item" :index="item" @click="handleSelect(item)">
            <span>{{item}}</span>
          </el-menu-item>
        </el-menu>
      </div>
		</div>
		<div class="position-portrait-main common-layout">
			<h1 class="title">岗位画像特征</h1>
			<div class="fenge"></div>
			<div class="main-content">
				<div class="content">
					<div class="content-analyze">
						<li>相关性分析</li>
						<el-table :data="tableDataOne" border style="width: 100%">
							<el-table-column show-overflow-tooltip prop="id" label="序号" width="60" />
							<el-table-column show-overflow-tooltip prop="features" label="标签"/>
							<el-table-column show-overflow-tooltip prop="weight" label="相关系数" width="100"/>
							<el-table-column show-overflow-tooltip prop="niceFeatures" label="优秀特征" width="200" />
							<el-table-column show-overflow-tooltip prop="niceNumber" label="人数占比" width="100" />
							<el-table-column show-overflow-tooltip prop="badFeatures" label="较差特征" width="200"/>
							<el-table-column show-overflow-tooltip prop="badNumber" label="人数占比" width="100" />
						</el-table>
					</div>
					<div class="content-matching">
						<li>员工匹配度</li>
						<el-table :data="tableDataTwo" scrollbar-always-on height="310" style="width: 100%">
							<el-table-column prop="id" label="序号" width="120" />
							<el-table-column prop="number" sortable label="员工编号" width="120" />
							<el-table-column prop="name" label="员工姓名" />
							<el-table-column prop="unit" label="单位" width="120" />
							<el-table-column prop="post" label="岗位" width="130" />
							<el-table-column prop="scores" sortable label="月度绩效" width="120" />
							<el-table-column prop="factor" sortable label="匹配系数" width="180" />
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
import { useEmployeeStore } from '@/stores/employee'
import api from '@/api/api'
import { ElMessage } from 'element-plus'

const employeeStore = useEmployeeStore()
const PostStore = usePostStore()
const { createdTime } =storeToRefs(employeeStore)
const { postData,analyzeRelationList,analyzeMatchingList } = storeToRefs(PostStore)

const tableDataOne = ref<Array<any>>([])
const tableDataTwo = ref<Array<any>>([])
watchEffect(() => {
	tableDataOne.value= analyzeRelationList.value.map((item)=> {
		const { weight,niceNumber,badNumber,...props } = item
		return {
			...props,
			weight: weight.toFixed(2),
			badNumber: Number(badNumber).toFixed(2)+'%',
			niceNumber: Number(niceNumber).toFixed(2)+'%',
		}
	})
	tableDataTwo.value= analyzeMatchingList.value.map((item)=> {
		const { scores, factor ,...props } = item
		return {
			...props,
			factor: Number(factor).toFixed(2),
			scores: Number(scores).toFixed(2),
		}
	})
})

const handleSelect = async (post:string) => {
	const res = await api.findByPostAndCreatedTime({createdTime:createdTime.value,post})
	const res2 = await api.findPostFactorDesc({createdTime:createdTime.value,post})
	if (res.data.state === 200 && res2.data.state === 200 ) {
		PostStore.updateAnalyzeRelation(res.data.data)
		PostStore.updateAnalyzeMatching(res2.data.data)
	} else {
		ElMessage.error(res.data.msg)
		ElMessage.error(res2.data.msg)
	}
  
}
</script>

<style lang="scss" scoped>
.position-portrait {
	display: flex;
	width: 86vw;
	.position-portrait-aside {
		height: 93.5vh;
		width: 12.2vw;
		padding: 2vh;
		border-right: 2px solid #ebeef5;
		background-color: #f5f6f6;
		.portrait-aside-header {
			display: flex;
			flex-direction: column;
			height: 2vh;
			justify-content: space-between;
			margin-bottom: 2vh;
			.aside-title {
				font-size: 2vh;
			}
		}
		.portrait-aside-body {
      margin-top: -1.5vh;
			height: 85%;
      .el-menu {
        background-color: transparent;
        border: none;
        .el-menu-item,.is-active {   
          padding: 0 20px;
          height: 6vh;
          background-color: transparent;
          border-radius: 1vh;
          span {
            color: #6f6f6f;
          }
        }
        .is-active {
          border-right: 3px solid #afb1c7;
          border-left: 3px solid #afb1c7;
          span {
            color: #000;
          }
        }
      }
		}
	}
	.position-portrait-main {
		.main-content {
			height: 100%;
			width: 100%;
			border-radius: 1vh;
			overflow: hidden;

			.content {
				padding: 1vh 0;
				display: flex;
				flex-direction: column;
				height: 100%;
				.content-analyze {
					height: 50%;
					.el-table {
						margin: 1vh 0;
					}
				}
				.content-matching {
					height: 50%;
				}
			}
		}
	}
}
</style>
