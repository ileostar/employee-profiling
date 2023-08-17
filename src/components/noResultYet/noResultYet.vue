<template>
	<div class="no-result-yet">
		<Transition name="el-fade-in-linear">
			<div class="tips-icon" v-if="props.isShow">
				<svg-icon :iconName="props.iconName" :size="props.size"></svg-icon>
			</div>
			<slot v-else />
		</Transition>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	isShow: {
		type: Boolean,
		default: true,
	},
	size: {
		type: [Number, String],
		default: '300',
	},
	iconName: {
		type: String,
		default: 'noResultYet',
		required: true,
	},
})
</script>

<style lang="scss" scoped>
.tips-icon {
	width: 100%;
	height: 100%;
}
</style>
