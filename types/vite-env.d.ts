/// <reference types="vite/client" />
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const vueComponent: DefineComponent<object, object, unknown>
	export default vueComponent
}

interface ImportMetaEnv {
	VITE_AXIOS_BASE_URI: string
}

declare module 'element-plus/es/locale/lang/zh-cn'
