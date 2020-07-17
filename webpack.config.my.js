// webpack 是node写出来的 使用node语法
let path = require("path")
let HtmlWebpackPlugin = require("html-webpack-plugin")
console.log(path.resolve("build"))

module.exports = {
  devServer: { // 开发服务器配置
    port: 3030,
    progress: true, // 进度条
    contentBase: "./build",
    open: true,
  },
  mode: "development", // 模式 development production
  entry: "./src//index.js", // 入口
  output: {
    filename: 'bundle.[hash:8].js', //打包后的文件名, 只显示8位的hash
    path: path.resolve(__dirname, "build")  , // 路径必须是一个绝对路径
  },
  plugins: [ // 数组 放着所有webpack的插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true, // 资源加上hash后缀
    })

  ]
}