// @ts-nocheck
export default (code, fn) => {
	onMounted(() => {
		fn()
		//绑定监听事件
		window.addEventListener('keydown', code)
	});
	onUnmounted(() => {
		//销毁事件
		window.removeEventListener('keydown', code, false)
	});
}
