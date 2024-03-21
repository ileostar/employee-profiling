// @ts-nocheck
import { CommonServerOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueDevtools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import dotenv, { DotenvParseOutput } from 'dotenv'
import fs from 'fs'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(() => {
	const envMap: DotenvParseOutput = dotenv.parse(fs.readFileSync('.env'))

	const server: CommonServerOptions = {
		port: envMap.VITE_PORT,
		host: envMap.VITE_HOST,
	}

	return {
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), // 路径别名
			},
			extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
		},
		plugins: [
			createSvgIconsPlugin({
				iconDirs: [fileURLToPath(new URL('./src/assets/svg', import.meta.url))], //+ 新增
				symbolId: 'icon-[name]', //+ 新增
			}),
			vue(),
			VueDevtools(),
			// https://github.com/antfu/unplugin-auto-import
			AutoImport({
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
				],
				imports: [
					'vue',
					'vue-router',
					'pinia',
				],
				// Enable auto import by filename for default module exports under directories
				defaultExportByFilename: false,

				resolvers: [
					// Auto import UI components
					// 自动导入ElementPlus组件
					ElementPlusResolver(),
				],
				dts: './types/auto-imports.d.ts',
				dirs: [
					'./src/components',
					'./src/stores',
					'./src/api',
					'./src/composables',
          './src/router'
				],
				vueTemplate: true,
				injectAtEnd: true
			}),
			// https://github.com/antfu/vite-plugin-components
			Components({
				resolvers: [
					ElementPlusResolver(),

				],
				dts: './types/components.d.ts',
				include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			}),
		],
		server,
	}
})
