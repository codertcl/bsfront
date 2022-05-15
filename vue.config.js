module.exports = {
    devServer: {
        port: 8888, // 启动端口号
        open: true,  // 启动后是否自动打开网页
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                // target: 'http://192.168.6.130:32500',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            }
        }
    }
}
