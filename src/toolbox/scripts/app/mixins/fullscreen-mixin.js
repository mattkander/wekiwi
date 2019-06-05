'use strict';

module.exports = {
  init: function() {
    // Set initial properties
    this.width = parseInt(this.opts.width) || 0;
    this.height = parseInt(this.opts.height) || 0;
    // Getters
    this.root.getWidth = () => this.width;
    this.root.getHeight = () => this.height;
    this.root.getAlign = () => this.align;
    // Delegates methods calls on the root element to the component
    this.root.getScale = this.getScale.bind(this);
  },
  getScale: function() {
    // Do nothing when the width and height isn't set
    if(this.width === 0 || this.height === 0) {
      return 0;
    }
    // Calculate the scaling of the component
    var myScaleX = window.innerWidth / this.width,
    myScaleY = window.innerHeight / this.height,
    myScale;
    // Aspect fill
    if(this.fullscreen) {
      myScale = Math.max(myScaleX, myScaleY);
    }
    // Aspect fit
    else {
      myScale = Math.min(myScaleX, myScaleY);
    }
    return myScale;
  }
}
