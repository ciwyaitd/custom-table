let merge = require('webpack-merge')
let config = require('./webpack.config')
let path = require('path')

module.exports = merge(config, {
    entry: {
        'demo': './demo/src/index.js'
    },
    output: {
        path: path.join(__dirname, './demo/dist'),
        publicPath: '/demo/dist/',
        filename: '[name].js'
    },
    resolve: {
        modules: [
            path.join(__dirname, './src'),
            path.join(__dirname, './node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    // devtool: '#eval-source-map'
})
