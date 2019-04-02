const fs = require("fs");
const path = require("path");

module.exports = {
  getConfigFilePath: function (dir) {
    let files = fs.readdirSync(dir);
    files = files.filter(file => {
      return file.includes(".eslintrc");
    });
    if (files.length == 0) {
      return "File Not Found";
    }
    let configFilePath = "";
    files.forEach(file => {
      if (
        file.includes("eslintrc.y") ||
        file.includes("eslintrc.js") ||
        file == ".eslintrc"
      ) {
        configFilePath = path.join(dir, file);
      }
    });
    if (configFilePath != "") {
      return configFilePath;
    } else {
      return path.join(dir, ".eslintrc-base");
    }
  }
};