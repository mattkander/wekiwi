'use strict';

const notifier = require('node-notifier');
const color = require('ansi-colors');
const log = console.log;

module.exports = {
  // Logs a styled success string
  success: function(msg) {
    notifier.notify({ title: 'Success', msg });
    log(this.successString(msg));
  },
  // Returns a styled success string
  successString: function (msg) {
    return color.bgGreen(color.black('Success:')) + ' ' + color.green(msg);
  },
  // Logs a styled warning string
  warning: function(msg) {
    notifier.notify({ title: 'Warning', msg });
    log(this.warningString(msg));
  },
  // Returns a styled warning string
  warningString: function (msg) {
    return color.bgYellow(color.black('Warning:')) + ' ' + color.yellow(msg);
  },
  // Logs a styled error string
  error: function(msg) {
    notifier.notify({ title: 'Error', msg });
    log(this.errorString(msg));
  },
  // Returns a styled error string
  errorString: function (msg) {
    return color.bgRed(color.white('Error:')) + ' ' + color.red(msg)
  },
  // Logs a styled highlight string
  highlight: function(str) {
    return color.cyan(str);
  },
  // Logs an unstyled string
  log: function(str) {
    log(this.highlight(str));
  },
  // Logs a formated sass error
  sassError: function(err) {
    this.error(err.messageOriginal);
    this.error('File: ' + err.file);
    this.error('At line ' + err.line + ', column: ' + err.column);
  },
  // Logs a formated javascript error
  jsError: function(err) {
    this.error(err.message);
    this.error('File: ' + err.fileName);
    this.error('At line ' + err.loc.line + ', column: ' + err.loc.column);
  },
  // Logs a mustache error
  mustacheError: function(err) {
    this.error(err.message);
  },
  // Logs an array of errors and kills the (node) process
  errorAndKill: function(errs) {
    if(errs) errs.map(message => this.error(message));
    process.exit(1);
  }
}
