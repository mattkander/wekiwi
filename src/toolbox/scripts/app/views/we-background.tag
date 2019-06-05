<we-background>
  <yield/>

  <script type='es6'>
    'use strict';

    const AnimationMixin = require('../mixins/animation-mixin');
    const FullscreenMixin = require('../mixins/fullscreen-mixin');
    const assert = require('assert');

    this.componentDidMount = function(event) {
      this.initBackground();
      if(this.autoload) {
        this.load();
      }
    }

    this.initBackground = function() {
      this.root.style.backgroundColor = this.opts.color;
      // Make toolbox compatible with old we-background syntax
      if(!this.source  && !this.opts.color) {
        const legacySource = this.root.find('source', true)[0].src;
        if(legacySource) this.source = legacySource;
      }
    }

    this.load = function() {
      if(this.loading || this.loaded) return;
      if(!this.source && this.opts.color) {
        this.onNoImages();
      }
      else {
        return this.loadImageSource(this.source);
      }
    }

    this.loadImageSource = function(source) {
      assert(typeof source === 'string', 'Required arguments src is not a String');
      this.loading = true;
      this.update();
      let myImage = new Image();
      myImage.addEventListener('load', this.onImageLoad.bind(this));
      myImage.addEventListener('error', this.onImageError.bind(this));
      myImage.src = source;
    }

    this.onImageLoad = function(event) {
      let myImage = event.target;
      this.root.style.backgroundImage = `url(${ myImage.src })`;
      this.width = parseInt(this.opts.width) || myImage.naturalWidth;
      this.height = parseInt(this.opts.height) || myImage.naturalHeight;
      // Initial load is most important. After that the background loads and displays silently new images
      this.loading = false;
      this.loaded = true;
      this.update();
      if(this.opts.fade === '' || this.opts.fade) {
        this.fadeIn();
      }
      // Notifiy children
      new Function(this.opts.onload)();
    }

    this.onNoImages = function() {
      this.loading = false;
      this.loaded = true;
      this.update();
      if(this.opts.fade === '' || this.opts.fade) {
        this.fadeIn();
      }
      // Notifiy children
      new Function(this.opts.onload)();
    }

    this.onImageError = function(event) {
      this.loading = false;
      this.update();
      new Function(this.opts.onerror)();
    }

    // Add mixins
    this.mixin(AnimationMixin, FullscreenMixin);

    // Add listeners
    this.on('mount', this.componentDidMount.bind(this));

    // Set initial properties
    this.align      = this.opts.align || 'center center';
    this.fullscreen = 'fullscreen' in this.opts;
    this.loaded     = false;
    this.loading    = false;
    this.source     = this.opts.src;
    this.autoload   = true;

    // Delegates methods calls on the root element to the component
    this.root.load  = this.load.bind(this);
  </script>
</we-background>
