'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('node_modules/bootstrap-icons/font/bootstrap-icons.css');
  app.import('node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff', {
    destDir: 'assets/fonts',
  });
  app.import('node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2', {
    destDir: 'assets/fonts',
  });

  return app.toTree();
};
