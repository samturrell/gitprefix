const program = require('commander');
const fs = require('fs-extra');
const ini = require('ini');
const { resolveHome, logger, execute } = require('../utils');
const { name } = require('../package.json');

program
    .command('install')
    .description('Install the template')
    .option('-o, --overwrite', 'Overwrite existing hook')
    .action(async function(command) {
        const config = ini.parse(fs.readFileSync(resolveHome('~/.gitconfig'), 'utf-8'));

        if (!config.init || !config.init.templatedir) {
            logger.info('No template directory found.');
            process.exit();
        }

        const { templatedir } = config.init;

        logger.info(`🔍 Found template directory: ${ templatedir }`);

        const hooksDir = resolveHome(`${ templatedir }/hooks`);
        const hookFilePath = `${ hooksDir }/prepare-commit-msg`;

        const hookExists = fs.pathExistsSync(hookFilePath);

        if (
            hookExists
            && !command.overwrite
        ) {
            logger.error(`❌ Hook file already exists. [${ hookFilePath }]\n       To overwrite, pass the --overwrite flag.`);
            process.exit();
        }

        const formatterStub = fs.readFileSync('./stubs/formatter.js', 'utf-8');

        fs.ensureDirSync(hooksDir);

        logger.info('✅ Hook file created successfully.');
        logger.info(`ℹ️  To add to an existing git project, run \`${ name } init\``);
        
        fs.writeFileSync(hookFilePath, formatterStub, {
            mode: 0o755,
        });
    });
