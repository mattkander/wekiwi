<vevo-video playing={ this.playing }>
    <div id='video-container'>
        <yield/>
    </div>

    <we-spinner animating={ this.buffering }></we-spinner>

    <script type='es6'>
        'use strict';

        var AnimationMixin = require('app/mixins/animation-mixin'),
            VisibilityMixin = require('app/mixins/visibility-mixin'),
            VideoMixin = require('app/mixins/video-mixin'),
            wetransfer = require('app/api'),
            assert = require('assert'),
            getQueryByName = require('app/support/getQueryByName'),
            addArgsToFunctionName = require('app/support/addArgsToFunctionName');

        assert(('vevoDirectVideoManager' in window), 'Include vevoDirectVideoManager in your HTML https://scache.vevo.com/assets/js/vevo-direct-player.min.js');

        this.componentDidMount = function(event) {
            this.initPlayer();
        };

        this.initPlayer = function() {
            // Get the first source video from the component
            let mySources = this['video-container'].find('source', true);
            assert(!!mySources.length, 'Please as one or more sources to the component');

            this.source = mySources[0].getAttribute('src');
            this.videoId = 'video-container';

            // Initialize the videomanager
            let myPartnerId = getQueryByName(this.source, 'partnerId');
            vevoDirectVideoManager.initialize(myPartnerId, 'vevo_embedded');

            // Set playback options
            let myOptions = {
                autoplay: false,
                mobileControls: false,
            };

            // Set video info
            let myInfo = {
                id: this.videoId,
                isrc: getQueryByName(this.source, 'video'),
                options: myOptions,
            };

            // Load the video
            vevoDirectVideoManager.loadHTML5Video(myInfo, (id, selector, isrc) => {

                // Remove poster image
                let myVideoElement = document.getElementById('video-container_html5_api');
                myVideoElement.removeAttribute('poster');

                // Add listeners
                let myContainer = document.getElementById('video-container');
                myContainer.addEventListener('onVideoStart', this.onPlaybackStart.bind(this));
                myContainer.addEventListener('onTimeChange', this.onPlayback.bind(this));
                myContainer.addEventListener('onStateChange', this.onPlaybackState.bind(this));

                // Do some video stuff :D
                let myVideo = vevoDirectVideoManager.getVideoById(id);
                if(this.muted) {
                    myVideo.setVolume(0);
                }

                if(this.autoplay) {
                    this.play();
                }
            });
        };

        this.play = function() {
            if(this.state !== 'playing') {
                let myDuration = this.state !== 'paused' ? 200 : 0,
                    myEvent = this.state !== 'paused' ? 'start' : 'resume';

                this.state = 'playing';

                this.buffering = true;
                this.initialPlayback = true;
                this.playing = true;
                this.update();

                vevoDirectVideoManager.getVideoById(this.videoId).play();
                wetransfer.vast(myEvent, this.source);
            }
        };

        this.pause = function() {
            if(this.state !== 'paused') {
                this.state = 'paused';

                // Pause video
                vevoDirectVideoManager.getVideoById(this.videoId).pause();
                wetransfer.vast('pause', this.source);
            }
        };

        this.stop = function() {
            if(this.state !== 'idle') {
                this.state = 'idle';
                this.trackedProgress = 0;

                // Remove video from managaer
                let myVideo = vevoDirectVideoManager.getVideoById(this.videoId);
                myVideo.pause();
                myVideo.seekTo(0);

                // Reset properties
                this.buffering = false;
                this.playing = false;
                this.update();

                // Send event to API
                wetransfer.vast('close', this.source);
            }
        };

        this.replay = function() {
            // Set properties
            this.initialPlayback = false;

            // Replay video by setting the playhead to 0
            let myVideo = vevoDirectVideoManager.getVideoById(event.videoId);
            myVideo.seekTo(0);
            myVideo.play();

            // Notify listeners
            let myHandler = new Function(this.opts.onloop);
            myHandler();

            // Send event to API
            wetransfer.vast('rewind', this.source);
        };

        this.mute = function() {
            this.muted = true;
            this.setVolume(0);

            wetransfer.vast('mute', this.source);
        };

        this.unmute = function() {
            this.muted = false;
            this.setVolume(1);

            wetransfer.vast('unmute', this.source);
        };

        this.setVolume = function(value) {
            let myVideo = vevoDirectVideoManager.getVideoById(this.videoId);
            myVideo.setVolume(value);
        };

        this.onPlaybackState = function(event) {
            switch(event.stateName) {
                case 'buffering': this.onBuffering(event); break;
                case 'playing': this.onPlaybackResume(event); break;
                case 'ended': this.onPlaybackFinished(event); break;
            }
        };

        this.onBuffering = function(event) {
            if(this.initialPlayback) {
                this.buffering = true;
                this.update();
            }
        };

        this.onPlaybackResume = function(event) {
            this.buffering = false;
            this.update();
        };

        this.onPlaybackStart = function(event) {
            let myHandler = new Function(this.opts.onstart);
            myHandler();
        };

        this.onPlayback = function(event) {
            let myVideo = vevoDirectVideoManager.getVideoById(event.videoId);

            // Calculate the progress of the playback
            let myProgress = myVideo.getCurrentTime() / myVideo.getDuration();
            this.setProgress(this.source, myProgress);

            // Execute handler function
            let myFunctionName = addArgsToFunctionName(this.opts.onplayback, myVideo.getCurrentTime(), myVideo.getDuration(), myProgress),
                myHandler = new Function(myFunctionName);

            myHandler();
        };

        this.onPlaybackFinished = function(event) {
            if(this.state !== 'complete') {

                // Replay the video if the loop property is set
                if(this.loop) {
                    return this.replay();
                }

                // Reset properties
                this.buffering  = false;
                this.playing = false;
                this.update();

                this.state = 'complete';
                this.trackedProgress = 0;

                vevoDirectVideoManager.removeVideoById(this.videoId);

                // Notify listeners
                let myHandler = new Function(this.opts.onfinished);
                myHandler();

                // Send event to API
                wetransfer.vast('complete', this.source);
            }
        };

        this.mixin(AnimationMixin, VisibilityMixin, VideoMixin);

        // Set initial properties;
        this.autoplay = 'autoplay' in this.opts;
        this.buffering = false;
        this.loop = 'loop' in this.opts;
        this.muted = 'muted' in this.opts;
        this.playing = this.autoplay;
        this.state = 'idle';
        this.trackedProgress = 0;

        // Add listeners
        this.on('mount', this.componentDidMount.bind(this));

        // Delegate methods calls made on the root element to the videoplayer
        this.root.play = this.play.bind(this);
        this.root.stop = this.stop.bind(this);
        this.root.pause = this.pause.bind(this);

        this.root.mute = this.mute.bind(this);
        this.root.unmute = this.unmute.bind(this);
        this.root.setVolume = this.setVolume.bind(this);

    </script>
</vevo-video>
