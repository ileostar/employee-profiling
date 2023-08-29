// vite.config.ts
import { defineConfig } from "file:///E:/hc/%E5%A4%96%E5%8C%85/employee-Profiling/node_modules/.pnpm/vite@4.3.2_@types+node@20.2.4_sass@1.62.1/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/hc/%E5%A4%96%E5%8C%85/employee-Profiling/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.3.2_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";

// src/declare/myenv.d.ts
import "file:///E:/hc/%E5%A4%96%E5%8C%85/employee-Profiling/node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/lib/main.js";

// vite.config.ts
import dotenv from "file:///E:/hc/%E5%A4%96%E5%8C%85/employee-Profiling/node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/lib/main.js";
import fs from "fs";
import { createSvgIconsPlugin } from "file:///E:/hc/%E5%A4%96%E5%8C%85/employee-Profiling/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.2/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_dirname = "E:\\hc\\\u5916\u5305\\employee-Profiling";
var __vite_injected_original_import_meta_url = "file:///E:/hc/%E5%A4%96%E5%8C%85/employee-Profiling/vite.config.ts";
var vite_config_default = defineConfig((_mode) => {
  const envMap = dotenv.parse(fs.readFileSync(".env"));
  const server = {
    port: envMap.VITE_PORT,
    host: envMap.VITE_HOST
  };
  return {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL("./src/assets/svg", __vite_injected_original_import_meta_url))],
        //+ 新增
        symbolId: "icon-[name]"
        //+ 新增
      }),
      vue()
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
        // 路径别名
      },
      extensions: [".js", ".json", ".ts"]
      // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    test: {
      // 模拟dom环境
      environment: "happy-dom",
      coverage: {
        // 覆盖率提供者
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        // 设置覆盖文件夹
        reportsDirectory: "./coverage",
        // 检查每个文件的阈值
        perFile: true,
        // 设置代码覆盖率阈值
        lines: 75,
        functions: 75,
        branches: 75,
        statements: 75
      },
      open: true,
      include: ["./src/components/**/*.{test,spec}.ts"]
    },
    open: true,
    include: ["./src/components/**/*.{test,spec}.ts"],
    server
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2RlY2xhcmUvbXllbnYuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGhjXFxcXFx1NTkxNlx1NTMwNVxcXFxlbXBsb3llZS1Qcm9maWxpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGhjXFxcXFx1NTkxNlx1NTMwNVxcXFxlbXBsb3llZS1Qcm9maWxpbmdcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2hjLyVFNSVBNCU5NiVFNSU4QyU4NS9lbXBsb3llZS1Qcm9maWxpbmcvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XHJcbmltcG9ydCB7IENvbW1vblNlcnZlck9wdGlvbnMsIENvbmZpZ0VudiwgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgJy4vc3JjL2RlY2xhcmUvbXllbnYuZC50cydcclxuaW1wb3J0IGRvdGVudiwgeyBEb3RlbnZQYXJzZU91dHB1dCB9IGZyb20gJ2RvdGVudidcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoX21vZGU6IENvbmZpZ0VudikgPT4ge1xyXG5cdGNvbnN0IGVudk1hcDogRG90ZW52UGFyc2VPdXRwdXQgPSBkb3RlbnYucGFyc2UoZnMucmVhZEZpbGVTeW5jKCcuZW52JykpXHJcblxyXG5cdGNvbnN0IHNlcnZlcjogQ29tbW9uU2VydmVyT3B0aW9ucyA9IHtcclxuXHRcdHBvcnQ6IGVudk1hcC5WSVRFX1BPUlQsXHJcblx0XHRob3N0OiBlbnZNYXAuVklURV9IT1NULFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHBsdWdpbnM6IFtcclxuXHRcdFx0Y3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG5cdFx0XHRcdGljb25EaXJzOiBbZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMvc3ZnJywgaW1wb3J0Lm1ldGEudXJsKSldLCAvLysgXHU2NUIwXHU1ODlFXHJcblx0XHRcdFx0c3ltYm9sSWQ6ICdpY29uLVtuYW1lXScsIC8vKyBcdTY1QjBcdTU4OUVcclxuXHRcdFx0fSksXHJcblx0XHRcdHZ1ZSgpLFxyXG5cdFx0XSxcclxuXHRcdHJlc29sdmU6IHtcclxuXHRcdFx0YWxpYXM6IHtcclxuXHRcdFx0XHQnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRleHRlbnNpb25zOiBbJy5qcycsICcuanNvbicsICcudHMnXSwgLy8gXHU0RjdGXHU3NTI4XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU2NUY2XHU2MEYzXHU4OTgxXHU3NzAxXHU3NTY1XHU3Njg0XHU1NDBFXHU3RjAwXHU1NDBEXHVGRjBDXHU1M0VGXHU0RUU1XHU4MUVBXHU1REYxIFx1NTg5RVx1NTFDRlxyXG5cdFx0fSxcclxuXHRcdHRlc3Q6IHtcclxuXHRcdFx0Ly8gXHU2QTIxXHU2MkRGZG9tXHU3M0FGXHU1ODgzXHJcblx0XHRcdGVudmlyb25tZW50OiAnaGFwcHktZG9tJyxcclxuXHRcdFx0Y292ZXJhZ2U6IHtcclxuXHRcdFx0XHQvLyBcdTg5ODZcdTc2RDZcdTczODdcdTYzRDBcdTRGOUJcdTgwMDVcclxuXHRcdFx0XHRwcm92aWRlcjogJ2lzdGFuYnVsJyxcclxuXHRcdFx0XHRyZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCddLFxyXG5cdFx0XHRcdC8vIFx1OEJCRVx1N0Y2RVx1ODk4Nlx1NzZENlx1NjU4N1x1NEVGNlx1NTkzOVxyXG5cdFx0XHRcdHJlcG9ydHNEaXJlY3Rvcnk6ICcuL2NvdmVyYWdlJyxcclxuXHRcdFx0XHQvLyBcdTY4QzBcdTY3RTVcdTZCQ0ZcdTRFMkFcdTY1ODdcdTRFRjZcdTc2ODRcdTk2MDhcdTUwM0NcclxuXHRcdFx0XHRwZXJGaWxlOiB0cnVlLFxyXG5cdFx0XHRcdC8vIFx1OEJCRVx1N0Y2RVx1NEVFM1x1NzgwMVx1ODk4Nlx1NzZENlx1NzM4N1x1OTYwOFx1NTAzQ1xyXG5cdFx0XHRcdGxpbmVzOiA3NSxcclxuXHRcdFx0XHRmdW5jdGlvbnM6IDc1LFxyXG5cdFx0XHRcdGJyYW5jaGVzOiA3NSxcclxuXHRcdFx0XHRzdGF0ZW1lbnRzOiA3NSxcclxuXHRcdFx0fSxcclxuXHRcdFx0b3BlbjogdHJ1ZSxcclxuXHRcdFx0aW5jbHVkZTogWycuL3NyYy9jb21wb25lbnRzLyoqLyoue3Rlc3Qsc3BlY30udHMnXSxcclxuXHRcdH0sXHJcblx0XHRvcGVuOiB0cnVlLFxyXG5cdFx0aW5jbHVkZTogWycuL3NyYy9jb21wb25lbnRzLyoqLyoue3Rlc3Qsc3BlY30udHMnXSxcclxuXHRcdHNlcnZlcixcclxuXHR9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcaGNcXFxcXHU1OTE2XHU1MzA1XFxcXGVtcGxveWVlLVByb2ZpbGluZ1xcXFxzcmNcXFxcZGVjbGFyZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcaGNcXFxcXHU1OTE2XHU1MzA1XFxcXGVtcGxveWVlLVByb2ZpbGluZ1xcXFxzcmNcXFxcZGVjbGFyZVxcXFxteWVudi5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9oYy8lRTUlQTQlOTYlRTUlOEMlODUvZW1wbG95ZWUtUHJvZmlsaW5nL3NyYy9kZWNsYXJlL215ZW52LmQudHNcIjtpbXBvcnQgJ2RvdGVudidcclxuXHJcbmRlY2xhcmUgbW9kdWxlICdkb3RlbnYnIHtcclxuXHRpbnRlcmZhY2UgRG90ZW52UGFyc2VPdXRwdXQge1xyXG5cdFx0VklURV9CQVNFX1VSTDogc3RyaW5nXHJcblx0XHRWSVRFX1BPUlQ6IG51bWJlclxyXG5cdFx0VklURV9QUk9YWV9ET01BSU46IHN0cmluZ1xyXG5cdFx0VklURV9IT1NUOiBzdHJpbmdcclxuXHR9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQXlDLG9CQUFvQjtBQUM3RCxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlOzs7QUNIbVMsT0FBTzs7O0FES2xVLE9BQU8sWUFBbUM7QUFDMUMsT0FBTyxRQUFRO0FBQ2YsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxlQUFlLFdBQVc7QUFSbkMsSUFBTSxtQ0FBbUM7QUFBNEgsSUFBTSwyQ0FBMkM7QUFZdE4sSUFBTyxzQkFBUSxhQUFhLENBQUMsVUFBcUI7QUFDakQsUUFBTSxTQUE0QixPQUFPLE1BQU0sR0FBRyxhQUFhLE1BQU0sQ0FBQztBQUV0RSxRQUFNLFNBQThCO0FBQUEsSUFDbkMsTUFBTSxPQUFPO0FBQUEsSUFDYixNQUFNLE9BQU87QUFBQSxFQUNkO0FBRUEsU0FBTztBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1IscUJBQXFCO0FBQUEsUUFDcEIsVUFBVSxDQUFDLGNBQWMsSUFBSSxJQUFJLG9CQUFvQix3Q0FBZSxDQUFDLENBQUM7QUFBQTtBQUFBLFFBQ3RFLFVBQVU7QUFBQTtBQUFBLE1BQ1gsQ0FBQztBQUFBLE1BQ0QsSUFBSTtBQUFBLElBQ0w7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLE9BQU87QUFBQSxRQUNOLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUE7QUFBQSxNQUM5QjtBQUFBLE1BQ0EsWUFBWSxDQUFDLE9BQU8sU0FBUyxLQUFLO0FBQUE7QUFBQSxJQUNuQztBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUEsTUFFTCxhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUE7QUFBQSxRQUVULFVBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBO0FBQUEsUUFFakMsa0JBQWtCO0FBQUE7QUFBQSxRQUVsQixTQUFTO0FBQUE7QUFBQSxRQUVULE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLFVBQVU7QUFBQSxRQUNWLFlBQVk7QUFBQSxNQUNiO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsc0NBQXNDO0FBQUEsSUFDakQ7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLFNBQVMsQ0FBQyxzQ0FBc0M7QUFBQSxJQUNoRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
