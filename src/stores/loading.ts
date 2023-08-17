import { reactive } from 'vue'
import { defineStore } from 'pinia'

type pageDataType = {
	requestingObj?: any
	route?: any
}

// page store
export const usePage = defineStore('page', () => {
	// 请求数据
	const pageData = reactive<pageDataType>({
		requestingObj: {}, // 正在请求的接口集合，若存在正在请求的接口，则loading
		route: {}, // 路由信息，用于获取当前页面加载loading的dom，即meta.loadingContainerDom
	})

	/**
	 * 更新请求数据
	 * @param newData { pageDataType }
	 */
	const updatePageData = (newData: pageDataType) => {
		if (newData.requestingObj) pageData.requestingObj = newData.requestingObj
		if (newData.route) pageData.route = newData.route
	}
	return { pageData, updatePageData }
})
