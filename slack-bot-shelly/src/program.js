const Command = require('commander').Command;
const version = require('../package.json').version;
const log = require('./util/log');
const errorExit = require('./util/errorExit');

const appList = require('./commands/app-list');
const appEnvironments = require('./commands/app-environments');
const appRelease = require('./commands/app-release');
const appStatus = require('./commands/app-status');

const program = new Command('@shelly');

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
  .action(appList);

program
  .command('app-environments <app>')
  .alias('app-env')
  .description('Show environments configured for <app>')
  .action(appEnvironments);

program
  .command('app-release <app>')
  .description('Show <app> releases')
  .option(
    '-e, --env <env>',
    'Specify required environment. Default: all environments'
  )
  .action(appRelease);

program
  .command('app-status <app> <environment>')
  .description('Show <app> status on <environment>.')
  .action(appStatus);

program.on('command:*', function() {
  log(
    `Invalid command: ${program.args.join(
      ' '
    )}\nSee help for a list of available commands.`
  );
  errorExit();
});

program.parse(process.argv);
