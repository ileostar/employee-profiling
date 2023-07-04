/// <reference types="vite/client" />
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const vueComponent: DefineComponent<{}, {}, any>;
    export default vueComponent;
}


interface ImportMetaEnv {
    VITE_username : string
}

declare module 'element-plus/es/locale/lang/zh-cn';
