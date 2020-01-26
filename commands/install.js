const program = require('commander');
const fs = require('fs-extra');
const ini = require('ini');
const { resolveHome, logger } = require('../utils');
const { name } = require('../package.json');

program
    .command('install')
    .description('Install the template')
    .option('-o, --overwrite', 'Overwrite existing hook')
    .action(async function(command) {
        // Fetch the git config
        const config = ini.parse(fs.readFileSync(resolveHome('~/.gitconfig'), 'utf-8'));

        // Ensure that the template directory exists
        if (!config.init || !config.init.templatedir) {
            logger.info('No template directory found.');
            process.exit();
        }

        const { templatedir } = config.init;

        logger.info(`🔍 Found template directory: ${ templatedir }`);

        const hooksDir = resolveHome(`${ templatedir }/hooks`);
        const hookFilePath = `${ hooksDir }/prepare-commit-msg`;

        const hookExists = fs.pathExistsSync(hookFilePath);

        // Check if the CLI should overwrite
        if (
            hookExists
            && !command.overwrite
        ) {
            logger.error(`❌ Hook file already exists. [${ hookFilePath }]\n       To overwrite, pass the --overwrite flag.`);
            process.exit();
        }

        const formatterStub = fs.readFileSync('./stubs/formatter.js', 'utf-8');

        fs.ensureDirSync(hooksDir);
        // Create the hook
        fs.writeFileSync(hookFilePath, formatterStub, {
            mode: 0o755,
        });

        logger.info('✅ Hook file created successfully.');
        logger.info(`ℹ️  To add to an existing git project, run \`${ name } init\``);
    });
