'use strict';

module.exports = {
  init() {
    this.root.fadeIn = this.fadeIn.bind(this);
    this.root.fadeOut = this.fadeOut.bind(this);
  },
  fadeIn() {
    this.root.classList.remove('animated--fade-out');
    this.root.classList.add('animated--fade-in');
  },
  fadeOut() {
    this.root.classList.remove('animated--fade-in');
    this.root.classList.add('animated--fade-out');
  }
};
