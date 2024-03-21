// 刷新验证码
export const useRefreshImage = () => {
	const imgUrl = ref('')
	// 修改图片的src属性，添加一个时间戳参数来刷新图片
	function refreshImage() {
		import.meta.env.VITE_AXIOS_BASE_URI+'/verifyCode?' + Date.now();
	}

	return {
		imgUrl,
		refreshImage
	}
}
