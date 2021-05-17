const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('../webpack.config')

require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

const DevelopWbConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: baseWebpackConfig.externals.paths.dist,
    host: process.env.HOST,
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
    port: process.env.PORT,
    http2: process.env.HTTPS === 'true',
  },
  plugins: [new webpack.SourceMapDevToolPlugin({})],
})

module.exports = new Promise((resolve) => resolve(DevelopWbConfig))
