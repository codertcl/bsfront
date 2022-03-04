module.exports = {
    devServer: {
        port: 8888, // 启动端口号
        open: true,  // 启动后是否自动打开网页
        proxy: {
            // '/api': {
            //     target: 'http://serverresource.oss-cn-hangzhou.aliyuncs.com/', //目标路径
            //     changeOrigin: true,//允许跨域
            //     pathRewrite: {
            //         "^/api": "",
            //     },
            // },
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            }
        }
    }
}
