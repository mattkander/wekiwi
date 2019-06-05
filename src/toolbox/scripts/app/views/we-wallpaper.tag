<we-wallpaper>
  <yield/>

  <script type="es6">
    'use strict';

    const Animation = require('../mixins/animation-mixin');
    const Visibility = require('../mixins/visibility-mixin');

    this.componentDidMount = function(event) {
      this.initChildren();
      new Function(this.opts.onready)();
    }

    this.componentDidUnmount = function(event) {
      this.destroyChildren();
    }

    this.initChildren = function() {
      window.wallpaper = this.root;
      this.children = this.root.find('[id]', true);
      [].forEach.call(this.children, (element, index) => {
        // We are assigning all used elements within our advert as a global property.
        // I'm aware that this is bad practice. But in this case it used for convenience.
        // Third party developers can access all properties by simply calling their id.
        let myKey = element.getAttribute('id');
        // Only add children when the property is not found
        if(window.hasOwnProperty(myKey) === false) {
          window[myKey] = this.children[myKey] = element;
        }
      });
    }

    this.destroyChildren = function() {
      // Loop through all added keys to our global scope and remove them
      for(var key in this.children) {
        delete window[key];
      }
    }

    // Add mixins
    this.mixin(Animation, Visibility);

    // Add listeners
    this.on('mount', (this.componentDidMount.bind(this)));
    this.on('unmount', this.componentDidUnmount.bind(this));
  </script>
</we-wallpaper>
