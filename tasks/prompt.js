'use strict';

const { prompt } = require('inquirer');
const templates = require('../src/templates');

function create(options) {
  return new Promise((resolve, reject) => {
    if(options.account && options.campaign) 
      resolve(options);
    else
      prompt([
        {
          type: 'input',
          name: 'account',
          message: 'Please provide an account name:'
        },
        {
          type: 'input',
          name: 'campaign',
          message: 'Please provide a campaign name:'
        },
        {
          type: 'list',
          name: 'template',
          message: 'Please provide a template name:',
          choices: templates.valid,
          default: 'static'
        }
      ])
      .then(answers => resolve(answers))
      .catch(err => reject(err));
  });
}

module.exports = {
  create
}
