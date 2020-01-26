#!/usr/bin/env node

const program = require('commander');
const { version } = require('./package.json');

program.version(version);

['install', 'init', 'default'].forEach((command) => require(`./commands/${ command }`));

program.parse(process.argv);
