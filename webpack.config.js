const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    //host: '192.168.1.14',
    port: 3000,
    compress: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ]
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader'
        ]
      }
    ]
  },
  performance: {
    hints: false
  }
};
