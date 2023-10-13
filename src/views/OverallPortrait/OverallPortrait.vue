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
                  <el-table :data="overallAnalyzeResult" stripe style="width: 100%">
                    <el-table-column prop="post" label="岗位" width="180" />
                    <el-table-column prop="count" label="人数" width="180" />
                    <el-table-column prop="peoplePostFactor" label="人岗匹配系数" />
                    <el-table-column prop="maxFactor" label="最高匹配系数" width="180" />
                    <el-table-column prop="minFactor" label="最低匹配系数" />
                  </el-table>
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
	overallAnalyzeResult.value = msg.map((items: { [x: string]: any; minAge: any; maxAge: any; }) => {
		const { maxFactor,minFactor,peoplePostFactor,...item } = items
		return {
			maxFactor: Number(maxFactor).toFixed(2),
			minFactor: Number(minFactor).toFixed(2),
			peoplePostFactor: Number(peoplePostFactor).toFixed(2),
			...item
		}
	})
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
