'use strict';

let VisibilityMixin = {
  init: function() {
    // Hide the component if it's marked as hidden
    if(this.opts.hidden === '' || this.opts.hidden) {
      this.hide();
    }
    // Delegate methods to component
    this.root.show = this.show.bind(this);
    this.root.hide = this.hide.bind(this);
    this.root.toggleVisibility = this.toggleVisibility.bind(this);
  },
  show: function() {
    this.root.style.display = '';
  },
  hide: function() {
    this.root.style.display = 'none';
  },
  toggleVisibility: function() {
    if(this.root.style.display === 'none') {
      this.show();
    } else {
      this.hide();
    }
  }
}

module.exports = VisibilityMixin;
