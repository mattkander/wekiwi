'use strict';

const url = require('url');
const wetransfer = require('../api');

let VideoMixin = {
  init: function() {
    this.trackedProgress = 0;
  },
  setFullscreenVideo: function() {
    if (!this.fullscreen) {
      return;
    }
    let myMediaQuery = '(min-aspect-ratio: '+ this.width +'/'+ this.height +')';
    let myQueryList = window.matchMedia(myMediaQuery);
    let setDimensions = (queryList) => {
      if(queryList.matches) {
        this.player.style.cssText = 'max-width: 100%;';
      } else {
        this.player.style.cssText = 'max-height: 100%;';
      }
    }
    myQueryList.addListener(setDimensions);
    setDimensions(myQueryList);
  },
  trackVideoProgress: function(progress, source) {
    // Check for new vast events
    let myProgress = progress.toFixed(2);
    let myIndex = [0.25, 0.5, 0.75].map(progress => (progress <= myProgress) && (progress > this.trackedProgress)).lastIndexOf(true);
    // If an index was found
    if(myIndex !== -1) {
      this.trackedProgress = [0.25, 0.5, 0.75][myIndex];
      let myEvent = ['firstQuartile', 'midpoint', 'thirdQuartile'][myIndex];
      this.vast(myEvent, source);
    }
  },
  vast: function(event, source) {
    // Do nothing when vast is explicitly disabled
    if (this.disableVast) {
      return;
    }
    // Track vast event
    wetransfer.vast(event, source);
  }
}

module.exports = VideoMixin;
