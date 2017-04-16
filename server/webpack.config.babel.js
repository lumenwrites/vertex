var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules',
    ],
  },
  module: {
    loaders: [ {
            test: /\.css$/,
            include: /node_modules/,
            loaders: ['style-loader', 'css-loader'],
	}, {
            test: /\.jsx*$/,
            exclude: [/node_modules/, /.+\.config.js/],
            loader: 'babel',
	}, {
            test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf)$/i,
            loader: 'url-loader?limit=10000',
	}, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
	}, {
            test: /\.json$/,
            loader: 'json-loader',
	},
    ],
  },
  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
