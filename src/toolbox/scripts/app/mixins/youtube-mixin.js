'use strict';

let YoutubeMixin = {
  loadYoutubeAPI: function() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },
  onYoutubeAPIReady: function() {
    this.player = new YT.Player('embed-' + this.videoID + '-container', {
      videoId: this.videoID,
      playerVars: { 
        modestbranding: 0, 
        controls: 0, 
        color: 'white',
        enablejsapi: 1, 
        showinfo: 0,
        rel: 0
      },
      events: {
        onReady: this.onYoutubePlayerReady.bind(this),
        onStateChange: this.onYoutubePlayerStateChange.bind(this)
      }
    });
    this.onPlayerReady();
    this.update();
  },
  onYoutubePlayerReady: function() {

  },
  onYoutubePlayerStateChange: function(event) {
    const playerstate = this.player.getPlayerState();
    switch(playerstate) {
      case 1:
        this.onVideoPlaying();
        break;
      case 0: 
        this.onVideoEnded();
        break;
      case 2:
        this.onVideoPaused();
    }
  }
}

module.exports = YoutubeMixin;
