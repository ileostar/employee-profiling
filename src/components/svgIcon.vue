// src/components/svgIcon.vue
<!--只需要给一个dom存放svg即可-->
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
  <!--这边是做一个联动，根据传入的name来展示相关的svg-->
    <use :xlink:href="iconName" /> 
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'SvgIcon',
	props: { // 因为是被调用，所以要传入props
		name: { // 自定义svg的name属性
			type: String,
			required: true,
		},
		color: { // 自定义svg的color属性
			type: String,
			default: '',
		},
	},
	setup(props) { // 数据处理
		// 这边就是根据props的name来进行处理啦
		const iconName = computed(() => `#icon-${props.name}`); 
		const svgClass = computed(() => {
			//   console.log(props.name, "props.name");
			if (props.name) {
				return `svg-icon icon-${props.name}`;
			}
			return 'svg-icon'; // svg 标签
		});
		return {
			iconName,
			svgClass,
		};
	},
});
</script>

// 自己定一些喜欢的样式
<style lang="scss">
.svg-icon {
  width: 1.6em;
  height: 1.6em;
  margin-left: 3px;
}
</style>
