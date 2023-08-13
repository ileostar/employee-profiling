/// <reference types="vitest" />
import { CommonServerOptions, ConfigEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import './src/declare/myenv.d.ts';
import dotenv, { DotenvParseOutput } from 'dotenv';
import fs from 'fs';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig((_mode: ConfigEnv) =>{
	const envMap:DotenvParseOutput = dotenv.parse(fs.readFileSync('.env'));

	const server:CommonServerOptions = {
		port: envMap.VITE_PORT,
		host: envMap.VITE_HOST,
	};

	return {
		plugins: [createSvgIconsPlugin({
			iconDirs: [fileURLToPath(new URL('./src/assets/svg', import.meta.url))], //+ 新增
			symbolId: 'icon-[name]', //+ 新增
		}),vue()], 
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), // 路径别名
			},
			extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
		},
		test: {
			// 模拟dom环境
			environment: 'happy-dom',
			coverage: {
				// 覆盖率提供者
				provider: 'istanbul',
				reporter: ['text', 'json', 'html'],
				// 设置覆盖文件夹
				reportsDirectory: './coverage',
				// 检查每个文件的阈值
				perFile: true,
				// 设置代码覆盖率阈值
				lines: 75,
				functions: 75,
				branches: 75,
				statements: 75,
			},
			open: true,
			include: ['./src/components/**/*.{test,spec}.ts'],
		},
		open: true,
		include: ['./src/components/**/*.{test,spec}.ts'],
		server
	};
});

