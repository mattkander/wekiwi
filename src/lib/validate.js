'use strict';

const validator = require('validator');
const isValidPath = require('is-valid-path');
const templates = require('../templates');

module.exports = class Validate {
  constructor(args, model, task) {
    this.task = task;
    this.rules = model.rules[task];
    this.default = model.default;
    this.allowed = model.allowed;
    this.namesForHumans = model.namesForHumans;
    this.state = {
      valid: true,
      errors: []
    }
    this.args = this.addDefaults(args);
  }

  addDefaults(args) {
    Object.keys(this.rules).forEach(value => {
      if(args[value] === undefined && this.default[value]) {
        args[value] = this.default[value]
      }
    });
    return args;
  }

  run() {
    Object.keys(this.rules).forEach(value => {
      const id = value;
      const field = this.args[value];
      this.rules[value].split('|').forEach(value => {
        this[value](field, id);
      });
    });
    return this.state;
  }
  
  required(field, fieldID) {
    if(field !== undefined && field !== '') return;
    this.state.valid = false;
    const fieldName = this.namesForHumans[fieldID];
    this.state.errors.push(`${fieldName} is required`);
    return;
  }
  
  url(field, fieldID) {
    if(field === undefined) return;
    if(!isValidPath(field)) {
      this.state.valid = false;
      this.state.errors.push(`${field} is not a URI string`);
    }
    return;
  }

  valid(field, fieldID) {
    if(!validator.isIn(field, this.allowed[fieldID])) {
      this.state.valid = false;
      const fieldName = this.namesForHumans[fieldID];
      const options = this.allowed[fieldID].join(', ');
      this.state.errors.push(`You must use a valid ${fieldName} value. Try: ${options}`);
    }
    return;
  }
}