#!/usr/bin/env node

const program = require("commander");
const {
  predict
} = require("./classifier");

program.version("1.0.0").description("ESLint Rules Generator");

program
  .command("generate")
  .description("Generate ESLint Rules")
  .action(() => {
    predict();
  });

program.parse(process.argv);