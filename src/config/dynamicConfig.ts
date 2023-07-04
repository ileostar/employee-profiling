let dynamicConfig = {
    server_url: "http://127.0.0.1:5173"
    //自行加配置项
}
let jsonStr = JSON.stringify(dynamicConfig)
localStorage.dynamicConfig = jsonStr

export default dynamicConfig