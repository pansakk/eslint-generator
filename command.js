#!/usr/bin/env node

const program = require('commander');
const classifier = require('./classifier');

program
    .command('eslint-generate')
    .description('Generate ESLint Rules')
    .action(() => {
        classifier.predict();
    })