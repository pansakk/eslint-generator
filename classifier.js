const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const d3 = require("d3");
const cf = require("./configuration.js");
const wr = require("./writeFile.js");
const conf = require("./findConfigFile");
const path = require("path");
global.fetch = require("node-fetch");

const labels = ["-1", "0", "1", "2"];

const predict = () => {
  // Rules field outputs
  let str = fs.readFileSync(
    path.join(__dirname, "data_files", "rules.csv"),
    "utf-8"
  );
  let data = d3.csvParseRows(str, function(d) {
    return d;
  });

  let rules = [].concat.apply([], data[0]);
  rules.splice(0, 1);
  // Encode the inputs
  str = fs.readFileSync(
    path.join(__dirname, "data_files", "dataset.csv"),
    "utf-8"
  );

  data = d3.csvParseRows(str, function(d) {
    return d;
  });

  let headers = data[0];
  headers.splice(0, 1);
  let file = conf.getConfigFilePath("./");
  let config = cf.getConfig("./", file, headers, []);
  let datasetI = config;

  datasetI = datasetI.map(d => {
    return Number(d);
  });
  // Load ML model
  tf.loadLayersModel("file://" + __dirname + "/mymodel/model.json").then(
    model => {
      let ruleData = [];
      for (let i = 0; i < rules.length; i++) {
        let input = [Number((i / rules.length).toFixed(3)), datasetI];
        input = [].concat.apply([], input);
        let xs = tf.tensor2d([input]);
        let results = model.predict(xs);
        let index = results.argMax(1).dataSync()[0];
        let label = labels[index];
        ruleData.push([rules[i], label]);
      }
      wr.writeFile(file, ruleData, "./");
    }
  );
};

module.exports = {
  predict
};
