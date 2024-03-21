<script setup lang="ts">
import InforTable from './components/InforTable.vue'
import InforFunction from './components/InforFunction.vue'
</script>

<template>
	<div class="information">
		<div class="information-header">
			<h1>员工信息</h1>
			<InforFunction></InforFunction>
		</div>
		<div class="my-table" ref="tableContainer">
			<InforTable></InforTable>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.information {
	padding: 3vh;
	.information-header {
		overflow: hidden;
		display: flex;
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
