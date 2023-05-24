const path = require("path");
const fs = require("fs").promises;

const getPluginVersion = async () => {
  try {
    const content = await fs.readFile(
      path.join(__dirname, "config/app.php"),
      "utf8"
    );
    const versionRegex = /'version'\s*=>\s*'([\d.]+)'/;
    const matches = content.match(versionRegex);
    const version = matches ? matches[1] : null;
    return version;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

const pluginName = "helpgent";
const textDomain = pluginName;

module.exports = { getPluginVersion, pluginName, textDomain };
