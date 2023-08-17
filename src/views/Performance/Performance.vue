<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="performance">
		<div class="performance-header">
			<h1>绩效成绩</h1>
			<PerfoFunction></PerfoFunction>
		</div>
		<div class="my-table">
			<PerforTable></PerforTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import PerforTable from './components/PerforTable.vue'
import PerfoFunction from './components/PerforFunction.vue'
</script>

<style lang="scss" scoped>
.performance {
	padding: 3vh;
	.performance-header {
		display: flex;
		overflow: hidden;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2vh;
		h1 {
			font-size: 1.2vw;
		}
	}
	.my-table {
		height: 80vh;
	}
}
</style>
