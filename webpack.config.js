const path = require('path');
const {VueLoaderPlugin} = require("vue-loader");
const webpack = require('webpack');
const HTMLPlugin = require("html-webpack-plugin")
const ExtractPlugin = require("extract-text-webpack-plugin")
const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV,
  target: "web",
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        loader: "vue-loader"
      },
      {
        test: /\.(jsx)$/,
        loader: "babel-loader"
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpeg|jpg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: '[name]-[hash:6].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // 页面上的代码可以调用 process.env.NODE_ENV = "development"
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin(),
  ],

}
if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    // open:true,
    // historyFallback:{},
    hot: true,
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
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
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
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
  })
  config.plugins.push(
    new ExtractPlugin('style:[hash:8].css'),
  )
  config.optimization = {
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
}

module.exports = config




