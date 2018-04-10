let webpack = require('webpack')
let path = require('path')
let version = require('./package.json').version
let banner =
  "/**\n" +
  " * custom-table v" + version + "\n" +
  " * https://github.com/ciwyaitd/element-table-column\n" +
  " * MIT License\n" +
  " */\n";

module.exports = {
    output: {
        filename: 'custom-table.js',
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [
            path.join(__dirname, './src'),
            path.join(__dirname, './node_modules')
        ],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner,
            raw: true
        })
    ],
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
}
