const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const USE_CSS_MODULES = true
const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv === 'development'
const PATHS = {
  main: path.join(process.cwd()),
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

const getPlugins = () => {
  const plugins = [
    new HtmlWebPackPlugin({
      template: `${PATHS.main}/${PATHS.assets}index.html`
    }),
    new Dotenv({
      path: path.resolve(__dirname, isDev ? './.env.local' : './.env')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.assets}images`,
          to: `${PATHS.assets}/images`,
          flatten: true
        }
      ]
    }),
    new ESLintPlugin({
      failOnError: true,
      failOnWarning: false,
      emitWarning: false,
      emitError: true,
      outputReport: true,
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    }),
    new ForkTsCheckerWebpackPlugin()
  ]

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].[contenthash:8].css`,
        chunkFilename: `${PATHS.assets}css/[id].[contenthash:8].css`,
        ignoreOrder: true
      })
    )
  }

  return plugins
}

module.exports = {
  entry: {
    app: PATHS.src
  },
  externals: {
    paths: PATHS
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: isDev ? 'async' : 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: isDev }
        }
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10240,
          name: `${PATHS.assets}img/[name]__[hash:8].[ext]`
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          ...(isDev ? [{ loader: 'style-loader' }] : [{ loader: MiniCssExtractPlugin.loader }]),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: USE_CSS_MODULES && {
                localIdentName: isDev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
                localIdentContext: path.resolve(process.cwd(), 'src'),
                localIdentHashPrefix: 'CreativeHash'
              },
              sourceMap: isDev
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: 10240,
              name: '[name].[hash:8].[ext]',
              outputPath: 'fonts',
              publicPath: `${PATHS.assets}fonts`
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@ts': path.resolve(__dirname, 'src/ts'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.sass']
  },
  plugins: getPlugins()
}
