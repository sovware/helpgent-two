const FileManagerPlugin = require("filemanager-webpack-plugin");

const utility = {
    transformBuildPaths: ( path ) => {
        if ( Array.isArray( path ) && path.length === 2 ) {
            return {
                source: path[0],
                destination: `__build/zip/helpgent/${path[1]}`,
            };
        }
    
        return {
            source: path,
            destination: `__build/zip/helpgent/${path}`,
        };
    },

    transformBuildIgnorePaths: ( path ) => {
        return `__build/zip/helpgent/${path}`;
    }
};

const buildFiles = [
    'app',
    'assets',
    'config',
    'database',
    'enqueues',
    'languages/',
    'resources/views',
    'routes',
    [ 'vendor/vendor-src/*.php', 'vendor' ],
    [ 'vendor/vendor-src/**/*.php', 'vendor/vendor-src' ],
    'helpgent.php'
].map( utility.transformBuildPaths );

const buildIgnoreFiles = [
    '**/Gruntfile.js',
    '**/.gitignore',
    'vendor/vendor-src/bin/**',
    '**/dev-*/**',
    '**/*-test/**',
    '**/*-beta/**',
    '**/scss/**',
    '**/sass/**',
    '**/.*',
    '**/build/*.txt',
    '**/*.map',
    '**/*.config',
    '**/*.config.js',
    '**/package.json',
    '**/package-lock.json',
    '**/tsconfig.json',
    '**/mix-manifest.json',
    '**/phpcs.xml',
    '**/composer.json',
    '**/composer.lock',
    '**/*.md',
    '**/*.mix.js',
    '**/none',
    '**/artisan',
    '**/phpcs-report.xml',
    '**/LICENSE',
    '**/Installable',
    '**/tests',
].map( utility.transformBuildIgnorePaths );

module.exports = {
    entry: {},
    mode: 'production',
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: [
                    { delete: [ '__build' ] },
                    { copy: buildFiles },
                    { delete: buildIgnoreFiles },
                    { archive: [{
                        source: '__build/zip',
                        destination: '__build/helpgent.zip',
                    }]},
                    { move: [{
                        source: '__build/zip/helpgent',
                        destination: '__build/helpgent',
                    }]},
                    { delete: [ '__build/zip' ] },
                ]
            }
        })
    ]
}