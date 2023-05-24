const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const { log } = require( 'console' );
const HELPGENT_NAMESPACE = '@helpgent/';

const devHost = 'helpgent.test';

/**
 * Given a string, returns a new string with dash separators converted to
 * camelCase equivalent. This is not as aggressive as `_.camelCase` in
 * converting to uppercase, where Lodash will also capitalize letters
 * following numbers.
 *
 * @param {string} string Input dash-delimited string.
 * @return {string} Camel-cased string.
 */
function camelCaseDash( string ) {
	return string.replace( /-([a-z])/g, ( _, letter ) => letter.toUpperCase() );
}

module.exports = {
	...defaultConfig,
	entry: {
		'js/index': './resources/js/admin/index.js',
		'js/queryStore': './resources/js/queryStore',
		'css/global': './resources/sass/global.scss',
		'css/fonts': './resources/sass/fonts.scss',
	},
	output: {
		path: path.resolve( __dirname, './assets/build/' ),
		filename: '[name].js',
		clean: false,
	},
	plugins: [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin( {
			requestToExternal( request ) {
				if ( request.startsWith( HELPGENT_NAMESPACE ) ) {
					return [
						'helpgent',
						camelCaseDash(
							request.substring( HELPGENT_NAMESPACE.length )
						),
					];
				}
			},
			requestToHandle( request ) {
				if ( request.startsWith( HELPGENT_NAMESPACE ) ) {
					return `helpgent/${ camelCaseDash(
						request.substring( HELPGENT_NAMESPACE.length )
					) }`;
				}
			},
		} ),
	],
	resolve: {
		alias: {
			'@helpgent/queryStore': path.resolve(
				__dirname,
				'resources/js/queryStore'
			),
		},
	},
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'auto',
		port: 8887,
		host: devHost,
		proxy: {
			'/assets/build': {
				pathRewrite: {
					'^/assets/build': '',
				},
			},
		},
		headers: { 'Access-Control-Allow-Origin': '*' },
	},
};
