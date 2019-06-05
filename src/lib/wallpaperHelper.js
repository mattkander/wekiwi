const validator = require('validator');
const isValidPath = require('is-valid-path');
const fs = require('fs');
const OS = require('os');
const path = require('path');
const { prompt } = require('inquirer');
const templates = require('../templates');
const notify = require('./notify');
const Validate = require('./validate');
const model = require('../models/wallpaperModel');
const PUBLIC_PATH = path.resolve(__dirname, '../../public/wallpapers/') + '/';
const PUBLIC_PATH_RELATIVE = 'public/wallpapers/';
const SERVER_ROOT = path.resolve(__dirname, '../../public');

module.exports = {
  PUBLIC_PATH,
  PUBLIC_PATH_RELATIVE,
  SERVER_ROOT,
  wallpaper: {
    id: undefined,
    account: undefined,
    campaign: undefined,
    template: undefined,
    date: undefined,
    path: undefined,
    valid: undefined,
    exists: false,
    task: undefined,
    dist: false,
    isLegacy: false,
    paused: false,
    errors : []
  },
  confirmOverwrite: function() {
    const id = notify.highlight(this.wallpaper.id);
    const message = notify.warningString(`Do you really want to overwrite ${id}?`);
    return new Promise((resolve, reject) => {
      prompt({
        name: 'confirm',
        type: 'confirm',
        default: false,
        message
      })
      .then(answers => resolve(answers.confirm))
      .catch(err => err && notify.error(err));
    });
  },
  parse: function(args, task) {
    return new Promise((resolve, reject) => {
      // Validate command line arguments
      const validate = new Validate(args, model, task);
      const validation = validate.run();
      this.wallpaper.errors = validation.errors;
      this.wallpaper.valid = validation.valid;
      if(this.wallpaper.valid) {
        // Fill wallpaper object
        this.wallpaper.task = task;
        this.wallpaper.account = args.account;
        this.wallpaper.campaign = args.campaign;
        this.wallpaper.template = args.template;
        this.wallpaper.date = this.getDateCode();
        this.wallpaper.path = this.getPath(args);
        this.wallpaper.id = this.getIDFromArgs(args);
        this.wallpaper.exists = this.exists(this.wallpaper.path);
        if(this.wallpaper.exists) {
          // Prompt user if wallpaper exists
          this.confirmOverwrite()
          .then(confirm => confirm ? resolve(this.wallpaper) : process.exit(1))
          .catch(err => notify.error(err));
        }
        else {
          // Return wallpaper
          resolve(this.wallpaper);
        }
      }
      else {
        // Validation failed
        reject(this.wallpaper.errors);
      }
    });
  },
  parseID: function(args, task) {
    return new Promise((resolve, reject) => {
      // Validate command line arguments
      const validate = new Validate(args, model, task);
      const validation = validate.run();
      this.wallpaper.errors = validation.errors;
      this.wallpaper.valid = validation.valid;
      if(this.wallpaper.valid) {
        // Fill wallpaper object
        this.wallpaper.task = task;
        this.wallpaper.dist = (task === 'build') ? true : false;
        this.wallpaper.path = this.getPathByID(args);
        this.wallpaper.id = args.wallpaper;
        this.wallpaper.paused = args.paused;
        this.wallpaper.isLegacy = this.isLegacy(this.wallpaper.path);
        this.wallpaper.exists = this.exists(this.wallpaper.path);
        // Return wallpaper or throw error
        (this.wallpaper.exists) ? resolve(this.wallpaper) : reject(this.wallpaper.errors);
      }
      else {
        // Validation failed
        reject(this.wallpaper.errors);
      }
    });
  },
  getBlueprint: function(data) {
    return Object.assign(data, {
      createdAt: new Date(),
      createdBy: OS.userInfo().username
    });
  },
  // TODO: move mkdir and blueprint tasks inside or add to gulp series;
  getPath: function(args) {
    return PUBLIC_PATH + args.account + '/' + this.getDateCode() + '/' + args.campaign;
  },
  getPathByID: function(args) {
    return PUBLIC_PATH + args.wallpaper;
  },
  getDateCode: function() {
    const date = new Date();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear().toString();
    return parseInt(year.slice(-2)) + month;
  },
  exists: function(wallpaper) {
    if(fs.existsSync(wallpaper + '/src')) return true;
    if(this.wallpaper.task != 'create') this.wallpaper.errors.push('That wallpaper does not exist');
    return false;
  },
  isLegacy: function(path) {
    return !fs.existsSync(path + '/config.json');
  },
  getIDFromArgs: function(args) {
    return args.account + '/' + this.getDateCode() + '/' + args.campaign;
  },
  getJSON: function(file) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(fs.readFileSync(file));
        resolve(data);
      }
      catch(e) {
        throw {
          error: e,
          file
        };
      }
    });
  }
}
