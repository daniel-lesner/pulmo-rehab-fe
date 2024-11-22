'use strict';

module.exports = {
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html', '**/*.hbs'],
      options: {
        singleQuote: true,
        tabWidth: 2,
      },
    },
  ],
};
