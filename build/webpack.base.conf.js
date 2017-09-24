var path = require('path');// 使用 webpack
var utils = require('./utils');// 使用一些小工具
var config = require('../config'); // 同样的使用了 config/index.js
var vueLoaderConfig = require('./vue-loader.conf');
var autoprefixer = require('autoprefixer');
function resolve (dir) { // 拼接我们的工作区路径为一个绝对路径
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  entry: {
    app: './src/main.js'// 编译文件入口
  },
  output: {
    path: config.build.assetsRoot, // 编译输出的静态资源根路径
    filename: '[name].[hash].js',// 编译输出的文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],  // 自动补全的扩展名
    alias: {  // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'pages':path.resolve(__dirname,"../src/pages"),
      'components':path.resolve(__dirname,"../src/components"),
      'productlist':path.resolve(__dirname,"../src/components/productlist"),
      'store':path.resolve(__dirname,"../src/store"),
      'src':path.resolve(__dirname,"../src")
    }
  },
  module: {
    rules: [
      // 预处理的文件及使用的 loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
    ]
  }
}; // 原来的webpack配置

var vuxLoader = require('vux-loader');

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{
    name: 'vux-ui'
  }]
});

