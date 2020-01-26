const colors = require('colors');
const program = require('commander');

if (!process.argv.slice(2).length) {
    program.outputHelp((text) => colors.green(text));
}
