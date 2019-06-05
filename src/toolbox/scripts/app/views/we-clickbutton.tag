<we-clickbutton>
  <script type="es6">
    'use strict';

    const wetransfer = require('../api');
    
    this.root.on('click', event => wetransfer.click());
  </script>
</we-clickbutton>