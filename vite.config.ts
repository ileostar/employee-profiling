/// <reference types="vitest" />
import { CommonServerOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import './src/declare/myenv.d.ts'
import dotenv, { DotenvParseOutput } from 'dotenv'
import * as fs from 'node:fs'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig((_mode) => {
	const envMap: DotenvParseOutput = dotenv.parse(fs.readFileSync('.env'))

	const server: CommonServerOptions = {
		port: envMap.VITE_PORT,
		host: envMap.VITE_HOST,
	}

	return {
		plugins: [
			createSvgIconsPlugin({
				iconDirs: [fileURLToPath(new URL('./src/assets/svg', import.meta.url))], //+ 新增
				symbolId: 'icon-[name]', //+ 新增
			}),
			vue()
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), // 路径别名
			},
			extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
		},
		server,
	}
})
