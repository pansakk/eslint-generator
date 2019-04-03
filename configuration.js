const fs = require('fs');
const yaml = require("js-yaml");
const strip = require("strip-json-comments");
const path = require("path");
const fix = require('./fixdataset.js');

module.exports = {

    getConfig: function getFields(dir, file, fields, result) {
        let defaultValues = [
            "eslint:recommended",
            "espree",
            "5",
            "script",
            false,
            false,
            false,
            "0",
            0,
            true,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ];
        let headers = [
            "extends",
            "parser",
            "ecmaVersion",
            "sourceType",
            "globalReturn",
            "impliedStrict",
            "jsx",
            "plugins",
            "globals",
            "browser",
            "node",
            "commonjs",
            "shared-node-browser",
            "es6",
            "worker",
            "amd",
            "mocha",
            "jasmine",
            "jest",
            "phantomjs",
            "protractor",
            "qunit",
            "jquery",
            "prototypejs",
            "shelljs",
            "meteor",
            "mongo",
            "applescript",
            "nashorn",
            "serviceworker",
            "atomtest",
            "embertest",
            "webextensions",
            "greasemonkey"
        ];
        let objFile = {};
        try {
            let data = fs.readFileSync(file, "utf-8");
            try {
                objFile = yaml.safeLoad(data);
            } catch (error) {
                let str = strip(data);
                try {
                    objFile = JSON.parse(str);
                } catch (err) {
                    objFile = require(file);
                }
            }
        } catch (err) {
            // console.log("Found no eslintrc file");
        }




        let ext = objFile.extends;
        let parser = objFile.parser;
        let parserOptions = objFile.parserOptions;
        let plugins = objFile.plugins;
        let globals = objFile.globals;
        let env = objFile.env;

        if (ext != undefined) {
            if (result[0] == null) {
                result[0] = ext;
            }
        } else {
            if (result[0] == null) {
                result[0] = defaultValues[0];
            }
        }
        if (parser != undefined) {
            result[1] = parser;
        } else {
            if (result[1] == null) {
                result[1] = defaultValues[1];
            }
        }
        if (parserOptions != undefined) {
            let ecmaVersion = parserOptions.ecmaVersion;
            let sourceType = parserOptions.sourceType;
            let ecmaFeatures = parserOptions.ecmaFeatures;

            if (ecmaVersion != undefined) {
                result[2] = ecmaVersion;
            } else {
                if (result[2] == null) {
                    result[2] = defaultValues[2];
                }
            }

            if (sourceType != undefined) {
                result[3] = sourceType;
            } else {
                if (result[3] == null) {
                    result[3] = defaultValues[3];
                }
            }

            if (ecmaFeatures != undefined) {
                let globalReturn = ecmaFeatures.globalReturn;
                let impliedScript = ecmaFeatures.impliedScript;
                let jsx = ecmaFeatures.jsx;

                if (globalReturn != undefined) {
                    result[4] = globalReturn;
                } else {
                    if (result[4] == null) {
                        result[4] = defaultValues[4];
                    }
                }

                if (impliedScript != undefined) {
                    result[5] = impliedScript;
                } else {
                    if (result[5] == null) {
                        result[5] = defaultValues[5];
                    }
                }

                if (jsx != undefined) {
                    result[6] = jsx;
                } else {
                    if (result[6] == null) {
                        result[6] = defaultValues[6];
                    }
                }
            } else {
                if (result[4] == null) {
                    result[4] = defaultValues[4];
                }
                if (result[5] == null) {
                    result[5] = defaultValues[5];
                }
                if (result[6] == null) {
                    result[6] = defaultValues[6];
                }
            }
        } else {
            if (result[2] == null) {
                result[2] = defaultValues[2];
            }
            if (result[3] == null) {
                result[3] = defaultValues[3];
            }
            if (result[4] == null) {
                result[4] = defaultValues[4];
            }
            if (result[5] == null) {
                result[5] = defaultValues[5];
            }
            if (result[6] == null) {
                result[6] = defaultValues[6];
            }
        }

        if (plugins != undefined) {
            result[7] = plugins;
        } else {
            if (result[7] == null) {
                result[7] = defaultValues[7];
            }
        }

        if (globals != undefined) {
            result[8] = Object.keys(globals).length;
        } else {
            if (result[8] == null) {
                result[8] = defaultValues[8];
            }
        }

        if (env != undefined) {
            for (let i = 0; i < 25; i++) {
                if (result[i + 9] != true) {
                    result[i + 9] = env[headers[i + 9]];
                }
            }
        } else {
            for (let i = 9; i < 34; i++) {
                if (result[i] == null) {
                    result[i] = defaultValues[i];
                }
            }
        }
        if (Array.isArray(ext)) {
            for (let i = 0; i < ext.length; i++) {
                if (fs.existsSync(path.join(dir, ext[i]))) {
                    result = getFields(dir, path.join(dir, ext[i]), fields, result);
                } else if (
                    fs.existsSync(path.join(dir, "node_modules", "eslint-config-" + ext[i]))
                ) {
                    let f = fs.readdirSync(path.join(dir, "node_modules", "eslint-config-" + ext[i]));
                    f = f.filter(s => {
                        return s.includes('index')
                    });
                    if (f.length > 0) {
                        result = getFields(
                            path.join(dir, "node_modules", "eslint-config-" + ext[i]),
                            path.join(dir, "node_modules", "eslint-config-" + ext[i], f[0]),
                            fields,
                            result
                        );
                    }
                } else if (fs.existsSync(path.join(dir, "node_modules", ext[i]))) {
                    let f = fs.readdirSync(path.join(dir, "node_modules", ext[i]));
                    f = f.filter(s => {
                        return s.includes('index')
                    });
                    if (f.length > 0) {
                        result = getFields(
                            path.join(dir, "node_modules", ext[i]),
                            path.join(dir, "node_modules", ext[i], f[0]),
                            fields,
                            result
                        );
                    }

                }
            }
        } else if (ext != undefined) {
            if (fs.existsSync(path.join(dir, ext))) {
                result = getFields(dir, path.join(dir, ext), fields, result);
            } else if (
                fs.existsSync(path.join(dir, "node_modules", "eslint-config-" + ext))
            ) {
                let f = fs.readdirSync(path.join(dir, "node_modules", "eslint-config-" + ext));
                f = f.filter(s => {
                    return s.includes('index')
                });
                if (f.length > 0) {
                    result = getFields(
                        path.join(dir, "node_modules", "eslint-config-" + ext),
                        path.join(dir, "node_modules", "eslint-config-" + ext, f[0]),
                        fields,
                        result
                    );
                }

            } else if (fs.existsSync(path.join(dir, "node_modules", ext))) {
                let f = fs.readdirSync(path.join(dir, "node_modules", ext));
                f = f.filter(s => {
                    return s.includes('index')
                });
                if (f.length > 0) {
                    result = getFields(
                        path.join(dir, "node_modules", ext), path.join(dir, "node_modules", ext, f[0]),
                        fields,
                        result
                    );
                }

            }
        }

        for (let j = 0; j < result.length; j++) {
            if (result[j] === undefined) {
                result[j] = false;
            }
        }

        result = fix.fix(result, fields);
        result = result.map(r => {
            if (r == "FALSE" || r == 'false') {
                return 0;
            } else if (r == "TRUE" || r == "true") {
                return 1;
            } else {
                return r;
            }
        })
        return result;
    }

}