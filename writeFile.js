const fs = require("fs");
const yaml = require("js-yaml");
const strip = require("strip-json-comments");
const path = require("path");

module.exports = {
  writeFile: function write(file, rules, dir) {
    let y = false;
    let j = false;
    let objFile = {};
    try {
      let data = fs.readFileSync(file, "utf-8");
      try {
        objFile = yaml.safeLoad(data);
        y = true;
      } catch (error) {
        let str = strip(data);
        try {
          objFile = JSON.parse(str);
          j = true;
        } catch (err) {
          objFile = require(file);
          j = true;
        }
      }
    } catch (err) {
      console.log('Generating File...');
      objFile.extends = 'eslint:recommended';
      objFile.parser = 'espree';
      objFile.parserOptions = {};
      objFile.parserOptions.ecmaVersion = 5;
      objFile.parserOptions.sourceType = 'script';
      objFile.env = {};
      objFile.env.browser = true;
    }


    objFile.rules = {};
    for (let i = 0; i < rules.length; i++) {
      if (rules[i][1] != "-1") {
        objFile.rules[rules[i][0]] = rules[i][1];
      }
    }
    if (y === true) {
      console.log("writ asydan");
      fs.writeFileSync(
        path.join(dir, ".eslintrc.yaml"),
        yaml.safeDump(objFile)
      );
    } else {
      console.log("Writing File");
      fs.writeFileSync(
        path.join(dir, ".eslintrc.json"),
        JSON.stringify(objFile)
      );
    }
  }
};