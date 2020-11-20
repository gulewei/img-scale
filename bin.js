#!/usr/bin/env node
const path = require('path');
const resolve = (name) => path.resolve(process.cwd(), name);

const argv = require('yargs').number('factor').command('*', 'scale images base on factor', {
    input: {
        alias: 'i',
        default: './',
        describe: 'input path relative to cwd'
    },
    output: {
        alias: 'o',
        default: 'scaled',
        describe: 'output path relative to cwd'
    },
    factor: {
        alias: 'f',
        default: 0.5,
        describe: 'scale factor'
    }
}).argv;

const { input, output, factor } = argv;
require('./lib')(resolve(input), resolve(output), factor);
