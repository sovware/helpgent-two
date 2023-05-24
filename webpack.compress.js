const FileManagerPlugin = require("filemanager-webpack-plugin");
const normalizePath = require("normalize-path");
const Utils = require("./utils");
const path = require("path");

const pluginName = Utils.pluginName;
const dist = normalizePath(path.join(__dirname, "__build"));

module.exports = async () => {
  const version = await Utils.getPluginVersion();
  const zipName = ( version ) ? `${pluginName}-${version}` : pluginName;

  const transformBuildPaths = (path) => {
    if (Array.isArray(path) && path.length === 2) {
      return {
        source: path[0],
        destination: `${dist}/zip/${pluginName}/${path[1]}`,
      };
    }

    return {
      source: path,
      destination: `${dist}/zip/${pluginName}/${path}`,
    };
  };

  const buildFiles = [
    "app",
    "assets",
    "config",
    "database",
    "enqueues",
    "languages",
    "resources/views",
    "routes",
    "vendor",
    "readme.txt",
    `${pluginName}.php`,
  ].map(transformBuildPaths);

  const buildIgnoreFiles = [
    "**/Gruntfile.js",
    "**/.gitignore",
    "vendor/vendor-src/bin",
    "**/dev-*/**",
    "**/*-test/**",
    "**/*-beta/**",
    "**/scss/**",
    "**/sass/**",
    "**/.*",
    "**/build/*.txt",
    "**/*.map",
    "**/*.config",
    "**/*.config.js",
    "**/package.json",
    "**/package-lock.json",
    "**/tsconfig.json",
    "**/mix-manifest.json",
    "**/phpcs.xml",
    "**/composer.json",
    "**/composer.lock",
    "**/*.md",
    "**/*.mix.js",
    "**/none",
    "**/artisan",
    "**/phpcs-report.xml",
    "**/LICENSE",
    "**/Installable",
    "**/tests",
  ].map((path) => `${dist}/zip/${pluginName}/${path}`);

  return {
    entry: {},
    mode: "production",
    plugins: [
      new FileManagerPlugin({
        events: {
          onEnd: [
            { delete: [dist] },
            { copy: buildFiles },
            { delete: buildIgnoreFiles },
            {
              archive: [
                {
                  source: `${dist}/zip`,
                  destination: `${dist}/${zipName}.zip`,
                },
              ],
            },
            {
              move: [
                {
                  source: `${dist}/zip/${pluginName}`,
                  destination: `${dist}/${pluginName}`,
                },
              ],
            },
            { delete: [`${dist}/zip`] },
          ],
        },
      }),
    ],
  };
};
