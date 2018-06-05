const path = require('path');
const {VueLoaderPlugin} = require("vue-loader");
const webpack = require('webpack');
const merge = require('webpack-merge')
const HTMLPlugin = require("html-webpack-plugin")
const ExtractPlugin = require("extract-text-webpack-plugin")
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

let config

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  // open:true,
  // historyFallback:{},
  hot: true,
  historyApiFallback:{
    index:'/index.html'
  }
}

const defaultPlugin = [
  new webpack.DefinePlugin({ // 页面上的代码可以调用 process.env.NODE_ENV = "development"
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
]

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ],
    },
    devServer: devServer,
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin()
    ]),
  })

} else {

  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugin.concat([
      new ExtractPlugin('style:[hash:8].css'),
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    }
  })

}

module.exports = config

