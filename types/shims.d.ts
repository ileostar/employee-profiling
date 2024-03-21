import 'dotenv'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const vueComponent: DefineComponent<object, object, unknown>
  export default vueComponent
}

declare module 'dotenv' {
	interface DotenvParseOutput {
		VITE_BASE_URL: string
		VITE_PORT: number
		VITE_PROXY_DOMAIN: string
		VITE_HOST: string
	}
}
