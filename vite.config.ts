/// <reference path="./src/declare/myenv.d.ts" />
import { CommonServerOptions, ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import dotenv, { DotenvParseOutput } from 'dotenv'
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) =>{

  const envMap:DotenvParseOutput = dotenv.parse(fs.readFileSync(`.env`))

  const server:CommonServerOptions = {
    port: envMap.VITE_PORT,
    host: envMap.VITE_HOST
  }


  return {
    plugins: [vue()], 
    resolve: {
      alias: {
          "@": resolve(__dirname, 'src'), // 路径别名
      },
      extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    server
  }
}) 

