<template>
	<div class="overall-portrait common-layout">
		<h1 class="title">总体画像</h1>

		<div class="fenge"></div>
		<div class="overall-portrait-main">
			<OverallSelect></OverallSelect>
			<main>
				<employeeTagCard class="overall-portrait-result" color="#f0f7f7">
					<template v-slot:header>
						<li>分析结果</li>
					</template>
					<template v-slot:default>
						<noResultYet iconName="noResultTwo" size="430">
							<template v-slot:default>111</template>
						</noResultYet>
					</template>
				</employeeTagCard>
				<employeeTagCard class="overall-portrait-detail" color="#f0f7f7">
					<template v-slot:header>
						<li>明细</li>
					</template>
					<template v-slot:default>
						<noResultYet size="450">
							<template v-slot:default>111</template>
						</noResultYet>
					</template>
				</employeeTagCard>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import OverallSelect from './components/OverallSelect.vue'
import employeeTagCard from '@/components/employeeTagCard/employeeTagCard.vue'
import noResultYet from '@/components/noResultYet/noResultYet.vue'
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
			display: flex;
			height: 87%;
			li {
				padding-left: 1vw;
			}
			.overall-portrait-result {
				width: 40%;
				margin-right: 1vw;
			}
			.overall-portrait-detail {
				flex: 1;
			}
		}
	}
}
</style>
