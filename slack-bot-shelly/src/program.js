const Command = require('commander').Command;
const version = require('../package.json').version;

const program = new Command('@shelly');

function log(message) {
  console.log(message);
}

function errorExit() {
  process.exit(1);
}

program.version(version);

program
  .command('help')
  .description('Show help.')
  .action(() => {
    program.outputHelp();
  });

program
  .command('app-list')
  .description("Show configured <app>'s")
  .action(() => {
    log(`Not implemented.`);
  });

program
  .command('app-environments <app>')
  .alias('app-env')
  .description('Show environments configured for <app>')
  .action(app => {
    log(`[${app}] Not implemented.`);
  });

program
  .command('app-release <app>')
  .description('Show <app> releases')
  .option(
    '-e, --env <env>',
    'Specify required environment. Default: all environments'
  )
  .action(app => {
    log(`[${app}] Not implemented.`);
  });

program
  .command('app-status <app> <environment>')
  .description('Show <app> status on <environment>.')
  .action((app, environment) => {
    log(`[${app} ${environment}] Not implemented.`);
  });

program.on('command:*', function() {
  log(
    `Invalid command: ${program.args.join(
      ' '
    )}\nSee help for a list of available commands.`
  );
  errorExit();
});

program.parse(process.argv);
