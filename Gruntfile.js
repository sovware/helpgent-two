module.exports = ( grunt ) => {
	'use strict';

	const projectConfig = {
		name: 'helpgent',
		text_domain: 'helpgent',
		srcDir: './',
		distDir: `./__build/helpgent/`,
		version: '2.0.0',
	};

	let buildIgnoreFiles = [
		'**/tests/**',
	];

    let buildFiles = [
		'app/**',
		'assets/**',
		'config/**',
		'database/**',
		'enqueues/**',
		'languages/',
		'resources/views/**',
		'routes/**',
		'vendor/vendor-src/**/*.php',
		'helpgent.php'
	];

	buildIgnoreFiles = buildIgnoreFiles.map( ( item ) => {
		return '!' + projectConfig.srcDir + item;
	} );

	buildFiles = buildFiles.map( ( item ) => {
		return projectConfig.srcDir + item;
	} );

	const buildFileList = [ ...buildFiles, ...buildIgnoreFiles ];

    const textDomainFiles = [
        projectConfig.srcDir + '*.php',
        projectConfig.srcDir + '**/*.php',
        '!' + projectConfig.srcDir + '__build/**',
        '!' + projectConfig.srcDir + 'node_modules/**',
        '!' + projectConfig.srcDir + 'vendor/**',
        '!' + projectConfig.srcDir + 'vendor-src/**',
    ];

	grunt.initConfig( {
		// clean dist directory file
		clean: {
			options: { force: true },
			dist: [
				projectConfig.distDir + '/**',
				projectConfig.distDir.replace( /\/$/, '' ) + '.zip',
			],
		},

		// Copying project files to ../dist/ directory
		copy: {
			dist: {
				files: [
					{
						src: buildFileList,
						dest: projectConfig.distDir,
						filter: 'isFile',
					},
				],
			},
		},

		// Compress Build Files into ${project}.zip
		compress: {
			dist: {
				options: {
					force: true,
					mode: 'zip',
					archive:
						projectConfig.distDir.replace(
							projectConfig.name,
							''
						) +
						projectConfig.name +
						'-' +
						projectConfig.version +
						'.zip',
				},
				expand: true,
				cwd: projectConfig.distDir,
				src: [ '**' ],
				dest: '../' + projectConfig.name,
			},
		},

		// i18n
		addtextdomain: {
			options: {
				// textdomain: 'foobar',
				updateDomains: true, // List of text domains to replace.
			},
			target: {
				src: textDomainFiles
			},
		},

		checktextdomain: {
			standard: {
				options: {
					text_domain: projectConfig.text_domain, //Specify allowed domain(s)
					// correct_domain: true, // don't use it, it has bugs
					keywords: [
						//List keyword specifications
						'__:1,2d',
						'_e:1,2d',
						'_x:1,2c,3d',
						'esc_html__:1,2d',
						'esc_html_e:1,2d',
						'esc_html_x:1,2c,3d',
						'esc_attr__:1,2d',
						'esc_attr_e:1,2d',
						'esc_attr_x:1,2c,3d',
						'_ex:1,2c,3d',
						'_n:1,2,4d',
						'_nx:1,2,4c,5d',
						'_n_noop:1,2,3d',
						'_nx_noop:1,2,3c,4d',
					],
				},
				files: [
					{
						src: textDomainFiles,
						expand: true,
					},
				],
			},
		},

		makepot: {
			target: {
				options: {
					cwd: projectConfig.srcDir, // Directory of files to internationalize.
					mainFile: '', // Main project file.
					type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
					updateTimestamp: false, // Whether the POT-Creation-Date should be updated without other changes.
					updatePoFiles: false, // Whether to update PO files in the same directory as the POT file.
				},
			},
		},

		/**
		 * -------------------------------------
		 * @description print ASCII text
		 * @see https://fsymbols.com/generators/carty/
		 * -------------------------------------
		 */

		screen: {
			begin: `
	# Project   : ${ projectConfig.name }
	# Dist      : ${ projectConfig.distDir }
	# Version   : ${ projectConfig.version }`.cyan,
			textdomainchecking:
				`Checking textdomain [${ projectConfig.text_domain }]`.cyan,
			minifying: `Minifying js & css files.`.cyan,
			finish: `
			╭─────────────────────────────────────────────────────────────────╮
			│                                                                 │
			│                      All tasks completed.                       │
			│  Built files & Installable zip copied to the __build directory. │
			│                         ~ SovWare ~                             │
			│                                                                 │
			╰─────────────────────────────────────────────────────────────────╯
			`.green,
		},
	} );

	/**
	 * ----------------------------------
	 * @description Register grunt tasks
	 * ----------------------------------
	 */
	require( 'load-grunt-tasks' )( grunt );

	/**
	 * text domain fixing task
	 */
	grunt.registerTask( 'fixtextdomain', [
		'screen:textdomainchecking',
		'addtextdomain',
		'checktextdomain',
		'makepot',
	] );

	/**
	 * Status Screen
	 */
	grunt.registerMultiTask( 'screen', function () {
		grunt.log.writeln( this.data );
	} );

	/**
	 * Build and compress task
	 */
	grunt.registerTask( 'build', [
		'screen:begin',
		'clean',
		'fixtextdomain',
		// 'copy',
		// 'compress',
		'screen:finish',
	] );
};
