#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const EMOJI_REPLACEMENTS = {
    'fix': '🔧',
    'wip': '🚧',
    'bug': '🐛',
    'refactor': '🔨',
    'revert': '⏪',
    'pr ': '👌',
    'initial commit': '🎉',
    'responsive': '📱',
    'accessibility': '♿️',
};

const BRANCH_REPLACEMENTS = [
    'ref: refs/heads/',
    '\n',
    'task/',
    'epic/',
    'bug/',
    'hotfix/',
];

(async function updateCommitMessage() {
    let message = readFileSync(process.argv[2], 'utf8').trim();
    let branch = readFileSync(resolve(__dirname, '../HEAD'), 'utf8');

    branch = BRANCH_REPLACEMENTS.reduce((branch, str) => branch.replace(new RegExp(str, 'gi'), ''), branch);

    message = Object.entries(EMOJI_REPLACEMENTS)
        .filter(([text]) => ` ${ message } `.toLowerCase().includes(text))
        .reduce((message, [, emoji]) => `${ emoji } ${ message }`, message);

    if (!['master', 'develop'].includes(branch)) {
        message = `${ branch } - ${ message }`;
    }

    writeFileSync(process.argv[2], message, 'utf8');

    process.exit(0);
})();
