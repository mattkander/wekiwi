'use strict';

module.exports = {
  init: function() {
    this.top = 0;
    this.left = 0;
    this.root.invalidate = this.invalidate.bind(this);
    this.on('mount', this.componentDidMount.bind(this));
    window.addEventListener('resize', this.invalidate.bind(this));
  },
  componentDidMount: function() {
    // Check position parent
    this.positionParent = window[this.opts.positionwith];
    if(!!this.positionParent) {
      console.warn(`Make sure #${this.root.id} uses px values for positioning relative to #${this.positionParent.id}`);
      this.top = this.root.offsetTop / this.positionParent.getHeight();
      this.left = this.root.offsetLeft / this.positionParent.getWidth();
    }
    // Check scale parent
    this.scaleParent = window[this.opts.scalewith];
    if(!!this.scaleParent) {
      console.warn(`Make sure #${this.root.id} uses px values for its dimensions relative to #${this.positionParent.id}`);
    }
    this.invalidate();
  },
  getPosition: function() {
    // Stop executing when the component wasn't pinned
    if(!this.positionParent) {
      return;
    }
    // Get the scaling information and calculate the offsets
    let myScale = this.positionParent.getScale();
    // Calculate the dimensions of the element to which the component is relatively positioned to
    let myWidth = this.positionParent.getWidth() * myScale,
    myHeight = this.positionParent.getHeight() * myScale;
    // Find the horizontal offset
    let myAlignX = this.positionParent.getAlign().split(' ')[1],
    myOffsetX = (window.innerWidth - myWidth) * 0.5;
    if(myAlignX === 'left') {
      myOffsetX = 0;
    } else if (myAlignX === 'right'){
      myOffsetX = window.innerWidth - myWidth;
    }
    // Find the vertical offset
    let myAlignY = this.positionParent.getAlign().split(' ')[0],
    myOffsetY = (window.innerHeight - myHeight) * 0.5;
    if(myAlignY === 'top') {
      myOffsetY = 0;
    } else if (myAlignY === 'bottom') {
      myOffsetY = window.innerHeight - myHeight;
    }
    // Calculate the news position of the component
    let myPosition = {
      top: this.top * myHeight + myOffsetY,
      left: this.left * myWidth + myOffsetX,
    };
    return myPosition;
  },
  invalidate: function() {
    this.setPosition();
    this.setScale();
  },
  setPosition: function() {
    // Stop executing when the component wasn't pinned
    if(!this.positionParent) {
      return;
    }
    // Destructure the position information and set move the component to its new position
    let { top, left } = this.getPosition.call(this);
    top = parseInt(top);
    left = parseInt(left);
    this.root.style.top = `${top}px`;
    this.root.style.right = `auto`;
    this.root.style.bottom = `auto`;
    this.root.style.left = `${left}px`;
  },
  setScale: function() {
    if(!this.scaleParent) {
      return;
    }
    let myScale = this.scaleParent.getScale();
    this.root.style.transform = `scale(${myScale}, ${myScale})`;
    this.root.style.transformOrigin = `0 0`;
    this.root.style.webkitTransform = `scale(${myScale}, ${myScale})`;
    this.root.style.webkitTransformOrigin = `0 0`;
  }
}
