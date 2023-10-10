<template>
	<div class="MatchingPost">
		<div class="job-demand">
			<li>人岗匹配分析</li>
			<el-input
				v-model="textarea"
				:autosize="{ minRows: 3, maxRows: 5 }"
				type="textarea"
				:placeholder="example"
				resize="none"
				input-style="font-size: 1vh;"
			/>
			<el-button type="info" @click="submitInput">提交分析</el-button>
		</div>
		<el-divider />
		<div class="matching-result">
			<li>人岗匹配分析</li>
			<noResultYet class="noResultYet" :size="350" :isShow="!isShowTable">
        <template v-slot:default>        
          <el-table :data="tableData" stripe style="width: 100%;height: 100%;" :scrollbar-always-on="true">
            <el-table-column  prop="number" width="140" label="员工编号" sortable/>
            <el-table-column  prop="name"  label="员工姓名" sortable/>
            <el-table-column  prop="age" width="160" label="年龄" sortable/>
            <el-table-column  prop="post"  label="目前岗位" sortable/>
            <el-table-column  prop="unit"  label="单位" sortable/>
            <el-table-column  prop="factor" width="160" label="与当前岗位匹配度" sortable/>
          </el-table>
        </template>
			</noResultYet>
		</div>
	</div>
  <el-dialog v-model="isShowDiglog" title="需求标签">
    <div class="container">
      <h3 style="margin-bottom: 2vh;">选择标签</h3>
      <div class="selecttags">
        
        <el-tag
          v-for="tag in requirementTag"
          :key="tag"
          class="mx-1"
          :disable-transitions="false"
          @click="removeCurrentClickTag(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
      <el-divider />
      <div class="alltags">
        <h3 style="margin-bottom: 2vh;">全部标签</h3>
        <el-tag
          v-for="tag in AllTags"
          :key="tag"
          class="mx-1"
          :disable-transitions="false"
          @click="getCurrentClickTag(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
      <div class="buttontags">
        <el-form-item>
          <el-button type="primary" @click="submitTags">
            分析
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'
import * as _ from 'lodash'
import { ElMessage } from 'element-plus'
import api from '@/api/api'
import { storeToRefs } from 'pinia'
import { useMatchingStore } from '@/stores/matching'

const example = '例：我需要一个体力好，有服务意识，并且具备开发能力的员工'

const MatchingStore = useMatchingStore()
const { tableData,textarea } = storeToRefs(MatchingStore)

onMounted(() => {
	judgment()
	reqAllTags()
})


// 控制弹框显示
const isShowDiglog = ref(false)
// 控制表单显示
const isShowTable = ref(false)

// 需求结果标签
const requirementTag = ref<Array<string>>([])

// 全部标签
const AllTags = ref<Array<string>>([])

// 判断是否有信息
const judgment = () => {
	if(!_.isEmpty(tableData)) {
		isShowTable.value = true
	} else {
		isShowTable.value = false
	}
}

// 获取全部标签
const reqAllTags = async () => {
	const res = await api.selectTag()
	if( res.data.state === 200 ) {
		AllTags.value = res.data.data.map((item: { id: number,features: string,name: string }) => item.features).sort((a:string,b:string)=> a.length-b.length)
	}
}

// 获取当前全部标签中被点击的标签
const getCurrentClickTag = (item: string) => {
	console.log(item);
	// 判断需求结果标签中有无该标签
	if(requirementTag.value.includes(item)) {
		return
	}
	// 将标签添加到需求结果标签中
	requirementTag.value.push(item)
}

// 去掉需求结果标签当中的标签
const removeCurrentClickTag = (item: string) => {
	console.log('删除标签',item)
	requirementTag.value = requirementTag.value.filter(v => v!==item)
}

// 提交输入框表单
const submitInput = async () => {
	if(!_.isEmpty(textarea.value)) {
		// 发起请求
		const res = await api.searchLabel(textarea.value)
		// 返回结果
		if(res.status===200){
			requirementTag.value = res.data
		}
		isShowDiglog.value = true
	} else {
		ElMessage.error('请先填写岗位需求！')
	}
}

// 重置
const reset = async () => {
	// 发起请求
	const res = await api.searchLabel(textarea.value)
	// 返回结果
	if(res.status===200){
		requirementTag.value = res.data
	}
}

// 提交标签
const submitTags = async () => {
	if(!_.isEmpty(requirementTag.value)) {
		// 发起请求
		const res = await api.searchemployee(requirementTag.value)
		// 返回结果
		if(res.status === 200) {
			tableData.value = res.data.map((items: { [x: string]: any; factor: any }) =>{
				const { factor,...item } = items
				return {
					factor: Number(factor).toFixed(2),
					...item
				}
			})
			isShowTable.value = true
			ElMessage.success('分析成功！')
		}
		isShowDiglog.value = false
	} else {
		ElMessage.error('标签需求不能为空！')
	}
}
</script>

<style lang="scss" scoped>
.MatchingPost {
	display: flex;
	flex-direction: column;
	margin: 1vh 0;
	height: 100%;
	.job-demand {
		height: 25%;
		width: 70%;
		margin: 1vh 0;
		li {
			margin-bottom: 2vh;
		}
		.el-button {
			margin-top: 2vh;
			float: right;
			font-size: 1.2vh;
			width: 6vw;
			height: 4vh;
		}
	}
	.matching-result {
		flex: 1;
		margin-top: -1vh;
    .noResultYet {
      display: block;
      height: 47vh;
      width: 75%;
      .el-table {
        width: 100%;
        height: 100%;
      }
    }
	}
}
.el-dialog {
  .container {
    width: 100%;
    .el-tag {
      margin-left: 1vh;
      margin-bottom: 1vh;
      cursor: pointer;
    }
    .buttontags {
      position: relative;
      margin: 2vh 0 -2vh;
        .el-form-item {
          .el-button:nth-child(2) {
            position: absolute;
            right: 5vw;
          }
          .el-button:nth-child(1) {
            position: absolute;
            right: 0;
          }
        }
    }
  }
}
</style>
@/stores/matching