let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');
config.entry.app.unshift('webpack-dev-server/client?http://localhost:3000/", "webpack/hot/only-dev-server')

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,// it suppress error shown in console,so it has to be set to false
    noInfo: false, // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    stats: {
        //config for minimal console.log mess.
        assets: false,
        color: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    },
    proxy:{
        '/kugou':{
            target:'http://m.kugou.com/',
            changeOrigin:true,
            pathRewrite: {"^/kugou" : ""}
        },
        '/yy_kugou':{
            target: "http://www.kugou.com/yy/",
            changeOrigin: true,
            pathRewrite: {"^/yy_kugou" : ""}
        },
        "/mobilecdn": {
            target: "http://mobilecdn.kugou.com",
            changeOrigin: true,
            pathRewrite: {"^/mobilecdn" : ""}
        }
    }
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});