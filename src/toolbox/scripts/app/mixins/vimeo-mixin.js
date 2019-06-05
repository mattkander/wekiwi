'use strict';

let VimeoMixin = {
  loadVimeoAPI: function() {
    // This is the URL of the video you want to load
    const videoUrl = 'http://www.vimeo.com/' + this.videoID;
    // This is the oEmbed endpoint for Vimeo (we're using JSON)
    // (Vimeo also supports oEmbed discovery. See the PHP example.)
    const endpoint = 'http://www.vimeo.com/api/oembed.json';
    // Tell Vimeo what function to call
    const callback = this.ID + '.vimeoReady';
    // Put the URL together
    const url = endpoint + '?url=' + encodeURIComponent(videoUrl) + '&callback=' + callback + '&width=640';
    var js = document.createElement('script');
    js.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(js);
    var js = document.createElement('script');
    js.setAttribute('src', 'https://player.vimeo.com/api/player.js');
    document.getElementsByTagName('head').item(0).appendChild(js);
  },
  onVimeoAPIReady: function(video) {
    this.refs.player.innerHTML = unescape(video.html);
    this.player = new Vimeo.Player('embed-' + this.videoID + '-container');
    this.player.on('play', this.onVideoPlaying.bind(this));    
    this.player.on('ended', this.onVideoEnded.bind(this));
    this.onPlayerReady();
  }
}

module.exports = VimeoMixin;
