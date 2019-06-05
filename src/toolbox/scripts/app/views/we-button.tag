<we-button disabled={ !this.enabled }>
  <yield/>

  <script type="es6">
    'use strict';

    const AnimationMixin = require('../mixins/animation-mixin');
    const PinnedMixin = require('../mixins/pinned-mixin');
    const TrackerMixin = require('../mixins/tracker-mixin');
    const VisibilityMixin = require('../mixins/visibility-mixin');

    this.onClick = function(event) {
      if('vast' in this.opts) {
        Tracker.event.apply(null, this.opts.vast.split(/,\s*/));
      }
    }

    this.enable = function() {
      this.enabled = true;
      this.update();
    }

    this.disable = function() {
      this.enabled = false;
      this.update();
    }

    // Add mixins
    this.mixin(AnimationMixin, PinnedMixin, VisibilityMixin);

    // Set initial properties
    this.enabled = this.opts.disabled !== '' && !this.opts.disabled;

    // Add listeners
    this.root.on('click', this.onClick.bind(this));

    // Delegate methods calls made on the root element to the videoplayer
    this.root.enable = this.enable.bind(this);
    this.root.disable = this.disable.bind(this);
  </script>
</we-button>