<we-embed 
  class="we-embed" 
  playing={ this.playing } 
  id={ this.opts.id || 'embed' + this.videoID }
  style="--primary-color: white; --secondary-color: black"
>
  <div class="we-video-controls">
    <button 
      class="we-embed__button we-embed__button--close" 
      id="closebutton" 
      onclick={ onClose }
    >
      <svg x="0px" y="0px" viewBox="0 0 50 50">
        <polygon points="34.98,18.35 31.63,15 24.99,21.64 18.35,15 15,18.35 21.64,24.99 15,31.65 18.35,35 24.99,28.34 31.63,35 34.98,31.65 28.34,24.99 "/>
      </svg>
    </button>
    <button 
      class="we-embed__button we-embed__button--play-pause" 
      id="pausebutton" 
      onclick={ onPlayPause }
    >
      <svg hide={ paused } x="0px" y="0px" viewBox="0 0 50 50">
        <rect x="15.8" y="15.5" width="5.5" height="20"/>
        <rect x="28.7" y="15.5" width="5.5" height="20"/>
      </svg>
      <svg show={ paused } x="0px" y="0px" viewBox="0 0 50 50">
        <polygon points="35.2,25 16.8,35.7 16.8,14.3"/>
      </svg>
    </button>
    <button 
      id="mutebutton" 
      class="we-embed__button we-embed__button--mute-unmute" 
      onclick={ onMuteUnmute }
    >
      <svg hide="{ muted }" x="0px" y="0px" viewBox="0 0 50 50">
        <polygon points="23.24,14.4 17.84,19.1 11.64,19.1 11.64,30.9 17.84,30.9 23.24,35.6  "/>
        <path d="M33.44,13.1l-2.1,2.1c2.6,2.6,4.1,6.1,4.1,9.8c0,3.7-1.4,7.2-4.1,9.8l2.1,2.1c3.2-3.2,4.9-7.4,4.9-11.9
        C38.34,20.5,36.64,16.3,33.44,13.1z"/>
        <path d="M29.34,16.9l-2.1,2.1c3.3,3.3,3.3,8.6,0,11.9l2.1,2.1C33.84,28.6,33.84,21.4,29.34,16.9z"/>
      </svg>
      <svg show="{ muted }" x="0px" y="0px" viewBox="0 0 50 50">
        <polygon points="23.24,14.4 17.84,19.1 11.64,19.1 11.64,30.9 17.84,30.9 23.24,35.6  "/>
        <polygon points="39.75,19.9 37.45,17.9 33.45,22.7 29.45,17.9 27.15,19.9 31.45,25 27.15,30.1 29.45,32.1 33.45,27.3 37.45,32.1 
        39.75,30.1 35.35,25 "/>
      </svg>
    </button>
    <div class="we-video-bar"></div>
  </div>
  <div id={ 'embed-' + this.videoID + '-container' } ref="player"></div>
  <we-clickbutton></we-clickbutton>
  
  <script type="es6">
    const VimeoMixin = require('../mixins/vimeo-mixin');
    const YoutubeMixin = require('../mixins/youtube-mixin');

    this.componentDidMount = function() {
      this.initPlayer();
    }

    this.play = function() {
      this.playing = true;
      this.paused = false;
      this.update();
      this.methods[this.source].play();
    }

    this.pause = function() {
      this.paused = true;
      this.update();
      this.methods[this.source].pause();
    }

    this.stop = function() {
      this.methods[this.source].stop();
      this.playing = false;
      this.update();
    }

    this.mute = function() {
      this.methods[this.source].mute();
      this.muted = true;
      this.update();
    }

    this.unMute = function() {
      this.methods[this.source].unMute();
      this.muted = false;
      this.update();
    }

    this.onClose = function(event) {
      this.stop();
      new Function(this.onEnd)();
    }

    this.onPlayPause = function(event) {
      (this.paused) ? this.play() : this.pause();
    }

    this.onMuteUnmute = function(event) {
      (this.muted) ? this.unMute() : this.mute();
    }

    this.onPlayerReady = function() {
      new Function(this.onReady)();
    }

    this.onVideoPlaying = function() {
      new Function(this.onPlay)();
    }

    this.onVideoEnded = function() {
      this.playing = false;
      this.update();
      new Function(this.onEnd)();
    }

    this.onVideoPaused = function() {
      new Function(this.onPause)();
    }

    this.initPlayer = function() {
      // Check if source and ID exists
      this.methods[this.source].init();
      // YouTube will check for a onYouTubeIframeAPIReady in the global scope
      window.onYouTubeIframeAPIReady = this.onYoutubeAPIReady.bind(this);
    }

    // Add mixins
    this.mixin(VimeoMixin, YoutubeMixin);

    // Set initial properties;
    this.player = undefined;
    this.ID = this.opts.id || 'embed' + this.videoID;

    this.source = this.opts.source;
    this.videoID = this.opts.videoId;

    this.onPlay = this.opts.onplay;
    this.onEnd = this.opts.onended;
    this.onPause = this.opts.onpause;
    this.onReady = this.opts.onready;

    this.playing = false;
    this.muted = false;
    this.paused = false;

    this.methods = {
      vimeo : {
        init   : this.loadVimeoAPI,
        play   : () => { this.player.play() },
        pause  : () => { this.player.pause() },
        stop   : () => { this.player.pause() },
        mute   : () => { this.player.setVolume(0) },
        unMute : () => { this.player.setVolume(1) }
      },
      youtube : {
        init   : this.loadYoutubeAPI,
        play   : () => { this.player.playVideo() },
        pause  : () => { this.player.pauseVideo() },
        stop   : () => { this.player.stopVideo() },
        mute   : () => { this.player.mute() },
        unMute : () => { this.player.unMute() }
      }
    }

    // Add listeners
    this.on('mount', this.componentDidMount.bind(this));

    // Delegate methods calls made on the root element to the videoplayer
    this.root.vimeoReady = this.onVimeoAPIReady.bind(this);
    this.root.play = this.play.bind(this);
    this.root.stop = this.stop.bind(this);
    this.root.pause = this.pause.bind(this);
    this.root.mute = this.mute.bind(this);
  </script>
</we-embed>
