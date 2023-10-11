<template>
	<div class="small-chart" :title="props.titles">
		<img class="small-icon" :src="props.image" alt="" />
		<div class="content">
			<div class="chart-text">
				<div class="title">{{ handleNumber(Number(props.chartData[1])) }}</div>
				<p class="text">{{ props.chartData[0] }}</p>
			</div>
			<div class="chart">
				<img class="chart" :src="props.chart" alt="" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

const handleNumber = (num: number) => {
	if (Number.isInteger(num)) { // 判断是否为整数
		return num; // 返回不变的整数
	} else if (typeof num === 'number') { // 判断是否为小数
		return num.toFixed(2); // 保留两位小数并返回
	} else {
		return num; // 如果不是数字类型，则返回原始值
	}
}

const props = defineProps({
	image: {
		type: String,
		required: true,
	},
	chart: {
		type: String,
		required: true,
	},
	chartData: {
		type: Array,
		required: true,
	},
	titles: {
		type: String,
		default: '',
	}
})
</script>

<style lang="scss" scoped>
.small-chart {
	display: flex;
	width: 19.5vw;
	height: 16vh;
	background-color: #fff;
	box-shadow: 3px 3px 8px 3px rgb(29 35 41 / 13%);
	border-radius: 3px;
	padding: 1.5vw;
	align-items: center;
	.small-icon {
		height: 8vh;
	}
	.content {
		display: flex;
		justify-content: space-between;
		margin-left: 1.5vw;
		width: 11vw;
		height: 8vh;
		align-items: center;
		.chart-text {
			display: flex;
			height: 6vh;
			flex-direction: column;
			justify-content: space-between;
			.title {
				font-size: 1.2vw;
				margin-bottom: 0.2vw;
			}
			.text {
				font-size: 0.9vw;
				color: #b2b2b2;
			}
		}
		.chart {
			height: 5vh;
		}
	}
}
</style>
