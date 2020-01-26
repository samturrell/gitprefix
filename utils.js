const resolveHome = (path = '') => path.replace('~', process.env.HOME);

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        })
    ]
});

function execute(command) {
    const { exec } = require('child_process');

    return new Promise((resolve) => {
        exec(command, function(error, stdout) {
            resolve(stdout);
        });
    })
}

module.exports = {
    resolveHome,
    logger,
    execute,
};
