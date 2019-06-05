<we-lang>
  <yield/>

  <script type="es6">
    'use strict';

    const assert = require('assert');
    const wetransfer = require('../api');

    this.componentDidMount = function() {
      assert(window.locale, 'No translations found/loaded. Make sure the component is loaded using the WeTransfer api.');
      if(!wetransfer.language) {
        return;
      }
      wetransfer.language((lang) => {
        let myResult = window.locale[lang];
        this.opts.key.split('.').forEach((key) => {
          if(!myResult) {
            return;
          }
          myResult = myResult[key];
        });
        if(!!myResult) {
          this.root.innerHTML = myResult;
        }
      });
    }

    this.on('mount', this.componentDidMount.bind(this));
  </script>
</we-lang>
