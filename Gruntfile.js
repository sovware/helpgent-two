module.exports = function ( grunt ) {
	// Project configuration.
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			options: {
				jshintrc: '.jshintrc',
			},
			all: [
				'Gruntfile.js',
				'assets/js/*.js',
				'resources/js/*.js',
				'package.json',
				'webpack.config.js',
			],
		},
	} );

	// Load the plugins that provide the tasks.
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	// Default task(s).
	grunt.registerTask( 'default', [ 'jshint' ] );
};
