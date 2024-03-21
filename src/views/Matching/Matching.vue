<script setup lang="ts">
import MatchingPost from './components/MatchingPost.vue'
import MatchingAnalyze from './components/MatchingAnalyze.vue'

// 创建响应式变量并初始化为 MatchingPost 组件
let currentComponent = ref(MatchingAnalyze)
let isMatchingAnalyzeActive = ref(true)

function toggleMatchingAnalyze() {
	currentComponent.value = MatchingAnalyze
	isMatchingAnalyzeActive.value = true
}
function toggleMatchingPost() {
	currentComponent.value = MatchingPost
	isMatchingAnalyzeActive.value = false
}
</script>

<template>
	<div class="matching common-layout">
		<h1 class="title">人岗匹配</h1>
		<div class="matching-select">
			<button
				:class="{ 'button-active': isMatchingAnalyzeActive }"
				@click="toggleMatchingAnalyze"
			>
				人岗匹配分析
			</button>
			<div class="sfenge"></div>
			<button
				:class="{ 'button-active': !isMatchingAnalyzeActive }"
				@click="toggleMatchingPost"
			>
				岗位按需匹配
			</button>
		</div>
		<div class="fenge"></div>
		<div class="matching-main">
			<component :is="currentComponent"></component>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.matching {
	.matching-select {
		display: flex;
		overflow: hidden;
		justify-content: space-between;
		border-radius: 2vh;
		border: 1px solid #4e8984;
		outline: none;
		width: 14vw;
		height: 4vh;
		margin-bottom: 1vh;
		font-size: 1.7vh;
		button {
			border: none;
			border-radius: 2vh;
			line-height: 3.5vh;
			width: 7vw;
			background-color: #fff;
			font-size: 1.7vh;
		}
		button:hover {
			cursor: pointer;
		}
		.button-active {
			background-color: #4e8984;
			color: #fff;
		}
	}
	.matching-main {
		height: 100%;
		width: 100%;
		overflow: hidden;

		font-size: 2vh;
	}
}
</style>
