// webpack 是node写出来的 使用node语法
let path = require("path")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let OptimizeCss = require("optimize-css-assets-webpack-plugin")
console.log(path.resolve("build"))
const insertAtTop = (element) => {
  var parent = document.querySelector("head")
  // eslint-disable-next-line no-underscore-dangle
  var lastInsertedElement = window._lastElementInsertedByStyleLoader

  if (!lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild)
  } else if (lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling)
  } else {
    parent.appendChild(element)
  }

  // eslint-disable-next-line no-underscore-dangle
  window._lastElementInsertedByStyleLoader = element
}

module.exports = {
  optimization: {
    minimizer: [new OptimizeCss()],
  },
  mode: "development", // 模式 development production
  entry: "./src/index.js", // 入口
  output: {
    filename: "bundle.[hash:8].js", //打包后的文件名, 只显示8位的hash
    path: path.resolve(__dirname, "build"), // 路径必须是一个绝对路径
  },
  devServer: {
    // 开发服务器配置
    port: 3030,
    progress: true, // 进度条
    contentBase: "./build",
    open: true,
  },
  plugins: [
    // 数组 放着所有webpack的插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true, // 资源加上hash后缀
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: "mian.css",
    }),
    // new OptimizeCss({}),
  ],
  module: {
    // 模块
    rules: [
      // 规则
      // ---------- loader的特点 --------------
      // use字段用于表示针对某一规则使用的loader
      // loader的特点是，每个loader功能单一
      // loader的用法，规则中的use字段如果是字符串的话，表示只用一个loader
      // 多个loader需要use用一个数组表示，数组中的loader可以用字符串或者对象表示
      // 当loader是用对象表示时，可以针对某一loader指定一些其他配置项
      // loader的顺序默认是从右向左，从下到上执行
      // ---------- 常用loader的作用介绍 ----------
      // css-loader 解释@import、url()这种语法
      // style-loader 将CSS注入到DOM中，默认是插入到head中
      {
        test: /.css$/,
        use: [
          // {
          //   loader: "style-loader", // css注入dom
          //   options: {
          //     // insert: insertAtTop,
          //   },
          // },
          MiniCssExtractPlugin.loader, // 替代style-loader，不再直接向dom中注入style标签，而是将css都抽离打包到一起
          "css-loader",
          "postcss-loader", // 给css样式加上浏览器内核前缀
        ],
      },
      {
        // 处理less文件(sass stylus node-sass sass-loader)
        test: /.less$/,
        use: [
          // {
          //   loader: "style-loader", // css注入dom
          //   options: {
          //     // insertAt: insertAtTop,
          //   },
          // },
          MiniCssExtractPlugin.loader, // 替代style-loader，不再直接向dom中注入style标签，而是将css都抽离打包到一起
          "css-loader", // 解析 @import
          "postcss-loader", // 给css样式加上浏览器内核前缀
          "less-loader", // 把less转成css
        ],
      },
    ],
  },
}
