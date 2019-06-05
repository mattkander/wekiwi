<we-video 
  playing={ this.playing } 
  style="{ '--primary-color:' + controlOpts['primary'] + '; --secondary-color:' + controlOpts['secondary']  }"
>
  <video preload={ this.preload } muted={ this.muted } loop={ this.loop }>
    <yield/>
  </video>
  <div show="{ controls }" class="we-video-controls">
    <button show="{ controlOpts['close'] }" onclick="{ this.handleClose }">
      <svg x="0px" y="0px" viewBox="0 0 50 50">
        <polygon points="34.98,18.35 31.63,15 24.99,21.64 18.35,15 15,18.35 21.64,24.99 15,31.65 18.35,35 24.99,28.34 31.63,35 34.98,31.65 28.34,24.99 "/>
      </svg>
    </button>
    <button show="{ controlOpts['mute'] }" onclick="{ this.handleMuteUnmute }">
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
    <button show="{ controlOpts['pause'] }" onclick="{ this.handlePlayPause }">
      <svg hide={ paused } x="0px" y="0px" viewBox="0 0 50 50">
        <rect x="15.8" y="15.5" width="5.5" height="20"/>
        <rect x="28.7" y="15.5" width="5.5" height="20"/>
      </svg>
      <svg show={ paused } x="0px" y="0px" viewBox="0 0 50 50">
        <polygon points="35.2,25 16.8,35.7 16.8,14.3"/>
      </svg>
    </button>
    <div class="we-video-bar">
      <div class="we-video-bar__progress"></div>
    </div>
  </div>

  <script type="es6">
    'use strict';

    const AnimationMixin = require('../mixins/animation-mixin');
    const VisibilityMixin = require('../mixins/visibility-mixin');
    const VideoMixin = require('../mixins/video-mixin');
    const wetransfer = require('../api');
    const assert = require('assert');
    const addArgsToFunctionName = require('../support/addArgsToFunctionName');
    const round = require('../support/round');

    this.initPlayer = function() {
      this.player = this.root.find('video');
      this.progressBar = this.root.find('.we-video-bar__progress');
      
      // Fix: Safari 10 if autoplay attr is present video will autoplay even if is set to autoplay=false.
      if(this.autoplay) this.player.setAttribute('autoplay', true);

      this.player.on('playing', this.onPlaybackStart.bind(this));
      this.player.on('timeupdate', this.onPlayback.bind(this));
      this.player.on('ended', this.onPlaybackFinished.bind(this));
      this.player.on('loadedmetadata', this.onMetaData.bind(this));
      this.player.on('seeked', this.onSeeked.bind(this));
      this.player.on('canplaythrough', this.onCanPlayThrough.bind(this));
      this.player.on('click', this.onClickOut.bind(this));
    }

    this.myControls = function() {
      const defaults = {
        primary: 'white',
        secondary: 'black',
        mute: false,
        pause: false,
        close: false
      };
      const options = {};
      if(this.controls) {
        const array = this.opts.controls.split(',');
        array.forEach(function(i) {
          if(i.includes('primary:')) {
            options.primary = i.replace('primary:', '').trim();
          }
          else if(i.includes('secondary:')) {
            options.secondary = i.replace('secondary:', '').trim();
          }
          else {
            options[i.trim()] = true;
          }
        });
        return Object.assign(defaults, options);
      }
      else {
        return defaults;
      }
    }

    this.handleMuteUnmute = function() {
      this.muted ? this.unmute() : this.mute();
    }

    this.handlePlayPause = function() {
      this.paused ? this.play() : this.pause();
    }

    this.handleClose = function() {
      this.stop();
      new Function(this.opts.onclose)();
      new Function(this.opts.onfinished)();
    }

    this.onClickOut = function() {
      if(this.clickout) {
        window.open(this.opts.clickout);
      }
      else {
        wetransfer.click();
      }
    }

    this.play = function() {
      if(this.state !== 'playing') {
        let myEvent = this.state !== 'paused' ? 'start' : 'resume';
        this.initialPlayback = true;
        this.playing = true;
        this.state = 'playing';
        this.paused = false;
        this.player.play();
        this.setFullscreenVideo();
        this.update();
        this.vast(myEvent, this.player.currentSrc);
      }
    }

    this.pause = function() {
      if(this.state !== 'paused') {
        this.state = 'paused';
        this.paused = true;
        this.player.pause();
        this.update();
        this.vast('pause', this.player.currentSrc);
      }
    }

    this.stop = function() {
      if(this.state !== 'idle') {
        this.state = 'idle';
        this.playing = false;
        this.trackedProgress = 0;
        this.player.pause();
        this.player.currentTime = 0;
        this.player.removeAttribute('style');
        this.update();
        this.vast('close', this.player.currentSrc);
      }
    }

    this.replay = function() {
      this.initialPlayback = false;
      this.vast('rewind', this.player.currentSrc);
      // Notify listeners
      new Function(this.opts.onloop)();
    }

    this.mute = function() {
      this.muted = true;
      this.update();
      this.vast('mute', this.player.currentSrc);
    }

    this.unmute = function() {
      this.muted = false;
      this.update();
      this.vast('unmute', this.player.currentSrc);
    }

    this.setVolume = function(value) {
      this.player.volume = value;
    }

    this.onMetaData = function(event) {
      this.width = parseInt(this.opts.width) || this.player.videoWidth;
      this.height = parseInt(this.opts.height) || this.player.videoHeight;
      this.setFullscreenVideo();
      new Function(this.opts.onmetadata)();
    }

    this.onCanPlayThrough = function(event) {
      this.update();
    }

    this.onPlaybackStart = function(event) {
      new Function(this.opts.onstart)();
    }

    this.onPlayback = function(event) {
      // Calculate the progress of the playback
      let myProgress = this.player.currentTime / this.player.duration;
      this.trackVideoProgress(myProgress, this.player.currentSrc);
      this.progressBar.style.width = round(myProgress * 100) + '%';
      // Execute handler function
      let myFunctionName = addArgsToFunctionName(this.opts.onplayback, this.player.currentTime, this.player.duration, myProgress);
      new Function(myFunctionName)();
    }

    this.onPlaybackFinished = function(event) {
      if(this.state !== 'complete') {
        this.state = 'complete';
        this.trackedProgress = 0;
        this.playing = false;
        this.update();
        this.player.currentTime = 0;
        this.player.style.display = '';
        this.player.pause();
        new Function(this.opts.onfinished)();
        this.vast('complete', this.player.currentSrc);
      }
    }

    this.onSeeked = function(event) {
      if(this.state == 'playing') {
        this.replay();
      }
    }

    // Add mixins
    this.mixin(AnimationMixin, VisibilityMixin, VideoMixin);

    // Add listeners
    this.on('mount', this.initPlayer.bind(this));

    // Set initial properties
    this.align              = this.opts.align || 'center center';
    this.autoplay           = 'autoplay' in this.opts;
    this.preload            = ('autoplay' in this.opts) ? 'auto' : 'none';
    this.fullscreen         = 'fullscreen' in this.opts;
    this.initialPlayback    = true;
    this.loop               = 'loop' in this.opts;
    this.muted              = 'muted' in this.opts;
    this.player             = undefined;
    this.playing            = this.autoplay;
    this.state              = !this.autoplay ? 'idle' : 'playing';
    this.disableVast        = 'disableVast' in this.opts;
    this.paused             = false;
    this.progressBar        = undefined;
    this.controls           = 'controls' in this.opts;
    this.clickout           = 'clickout' in this.opts;
    this.controlOpts        = this.myControls()

    // Delegate methods calls made on the root element to the videoplayer
    this.root.play          = this.play.bind(this);
    this.root.stop          = this.stop.bind(this);
    this.root.pause         = this.pause.bind(this);
    this.root.mute          = this.mute.bind(this);
    this.root.unmute        = this.unmute.bind(this);
    this.root.setVolume     = this.setVolume.bind(this);
  </script>
</we-video>
