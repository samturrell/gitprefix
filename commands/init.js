const program = require('commander');
const { logger, execute } = require('../utils');

program
    .command('init')
    .description('Init the template in current directory')
    .action(async function() {
        logger.info('Initialising Git templates...');

        logger.info(await execute('git init'));
    });
