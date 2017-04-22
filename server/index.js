/**
 * Entry Script
 */


if (process.env.NODE_ENV === 'production') {
    /* process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
     * process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));*/
    // In production, serve the webpacked server file.
    require('./dist/server.bundle.js');
} else {
    // Babel polyfill to convert ES6 code in runtime
    require('babel-register')({
	"plugins": [
	    [
		"babel-plugin-webpack-loaders",
		{
		    "config": "./webpack.config.babel.js",
		    "verbose": false
		}
	    ]
	],
	"presets": ["react", "es2015", "stage-2"],
    });
    /* require('babel-register')({
       "presets": ["es2015"]
     * });    */
    require('babel-polyfill');

    require('./server');
}
