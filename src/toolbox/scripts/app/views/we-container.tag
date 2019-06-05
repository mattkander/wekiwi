<we-container>
  <yield/>

  <script type="es6">
    'use strict';

    const AnimationMixin = require('../mixins/animation-mixin');
    const PinnedMixin = require('../mixins/pinned-mixin');
    const VisibilityMixin = require('../mixins/visibility-mixin');

    this.mixin(AnimationMixin, PinnedMixin, VisibilityMixin);
</script>
</we-container>
