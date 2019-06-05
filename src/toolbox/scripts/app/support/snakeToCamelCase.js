'use strict';

module.exports = (string) => string.replace(/(\-\w)/g, (match) => match[1].toUpperCase());
