#!/usr/bin/env node

'use strict';

const program = require('commander');
const notify = require('./src/lib/notify');
const create = require('./tasks/commands/create');
const edit = require('./tasks/commands/edit');
const build = require('./tasks/commands/build');
const toolbox = require('./tasks/commands/toolbox');
const serve = require('./tasks/commands/serve');
const update = require('./tasks/commands/update');
const autoUpdate = require('./src/lib/auto-update');

program
  .command('create')
  .description('Creates a wallpaper')
  .option('-a --account <account>', 'Account')
  .option('-c --campaign <campaign>', 'Campaign')
  .option('-t --template <template>', 'Template', 'static')
  .action(options => autoUpdate(options, create));

program
  .command('edit')
  .description('Creates a wallpaper')
  .option('-w --wallpaper <wallpaperID>', 'Wallpaper ID')
  .option('-p --paused', 'Pause timer during development')
  .action(options => autoUpdate(options, edit));

program
  .command('build')
  .description('Builds a wallpaper')
  .option('-w --wallpaper <wallpaperID>', 'Wallpaper ID')
  .action(options => autoUpdate(options, build));

program
  .command('toolbox')
  .description('Compiles the Wallpaper Toolbox library')
  .option('-d --dist', 'Compile and minify')
  .option('-w --watch', 'Compile and watch for changes')
  .action(toolbox);

program
  .command('serve')
  .description('Starts a dev server')
  .option('--https', 'Serve HTTPS')
  .option('-w --wallpaper <wallpaperID>', 'Wallpaper ID')
  .action(serve);

program
  .command('update')
  .description('Updates Wallpaper Sandbox')
  .action(update);

program
  .on('command:*', () => notify.errorAndKill(['Invalid command. See we --help for a list of available commands.']));

program.parse(process.argv);
