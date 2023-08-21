<template>
	<div class="overall-portrait common-layout">
		<h1 class="title">总体画像</h1>
		<div class="fenge"></div>
		<div class="overall-portrait-main">
			<OverallSelect @submitAnalyze="submitOverallAnalyze"></OverallSelect>
			<main>
				<employeeTagCard class="overall-portrait-result" color="#f0f7f7">
					<template v-slot:header>
						<li>分析结果</li>
					</template>
					<template v-slot:default>
						<noResultYet :isShow="!reveal" iconName="noResultTwo" size="430">
							<template v-slot:default>
                <div>
                  <h3>{{options.unit+options.post+options.sex+'性'+ageGroups.minAge+'到'+ageGroups.maxAge+'年龄段的共有'+overallAnalyzeResult.count+'人，人岗匹配系数是'+overallAnalyzeResult.peoplePostFactor}}</h3>
                  <el-descriptions
                    direction="vertical"
                    :column="6"
                    size="default"
                    border>
                    <el-descriptions-item label="岗位">{{ overallAnalyzeResult.post }}</el-descriptions-item>
                    <el-descriptions-item label="人数">{{ overallAnalyzeResult.count }}</el-descriptions-item>
                    <el-descriptions-item label="人岗匹配系数">{{ overallAnalyzeResult.peoplePostFactor }}</el-descriptions-item>
                    <el-descriptions-item label="最高匹配系数">{{ overallAnalyzeResult.maxFactor }}</el-descriptions-item>
                    <el-descriptions-item label="最低匹配系数">{{ overallAnalyzeResult.minFactor }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </template>
						</noResultYet>
					</template>
				</employeeTagCard>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OverallSelect from './components/OverallSelect.vue'
import employeeTagCard from '@/components/employeeTagCard/employeeTagCard.vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'

const reveal = ref(false)
type Options = {
  unit: string
  post: string
  sex: string
  age: string
  createdTime: string
}
type AnalyzeResult = {
  id: number
  post: string
  count: number
  peoplePostFactor: number
  maxFactor: number
  minFactor: number
}
const overallAnalyzeResult = ref<AnalyzeResult>({
	id: 0,
	post: '',
	count: 0,
	peoplePostFactor: 0,
	maxFactor: 0,
	minFactor: 0
})
const options = ref<Options>({
	unit: '',
	post: '',
	sex: '',
	age: '',
	createdTime: ''
})
const ageGroups = ref({
	minAge: '',
	maxAge: ''
})

// 子组件传递分析结果
const submitOverallAnalyze = (msg: any,option: Options,ageGroup: { minAge: string; maxAge: string }) => {
	console.log(msg)
	overallAnalyzeResult.value = msg
	options.value = option
	ageGroups.value = ageGroup
	reveal.value = true
}

</script>

<style lang="scss" scoped>
.overall-portrait {
	padding: 3vh;
	.overall-portrait-main {
		height: 100%;
		width: 100%;
		overflow: hidden;
		.overall-portrait-select {
			height: 12%;
		}
		main {
      overflow: hidden;
			height: 90%;
			li {
				padding-left: 1vw;
			}
			.overall-portrait-result {
        overflow: hidden;
        height: 93%;
        h3 {
          font-weight: 500;
          padding-top: 1vh;
          text-indent: 2em;
        }
        .el-descriptions {
          width: 70%;
          padding: 2vh;
        }
			}
		}
	}
}
</style>
