import { CommonServerOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import { resolve } from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default defineConfig((mode) => {
  const envFileName:string = '.env';
  const curEnvFileName:string = `${envFileName}.${mode.mode}`;
  console.log("curEnvFileName",curEnvFileName);
  console.log("mode.mode",mode.mode);
  const envData = fs.readFileSync(curEnvFileName);
  let server:CommonServerOptions={};
  if(mode.mode === 'dev'){
    
  } else if(mode.mode === 'prod'){
    
  }
  return {
    plugins: [vue()], 
    resolve: {
      alias: {
          "@": resolve(__dirname, 'src'), // 路径别名
      },
      extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    }
  }
})

