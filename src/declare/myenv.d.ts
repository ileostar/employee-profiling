import 'dotenv'

declare module "dotenv" {
    interface DotenvParseOutput {
        VITE_BASE_URL: string
        VITE_PORT: number
        VITE_PROXY_DOMAIN: string
        VITE_HOST: string
    }
}
