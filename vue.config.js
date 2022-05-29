module.exports = {
    devServer: {
        port: process.env.VUE_APP_PORT,     // 端口号
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json']
        }
    }

};
