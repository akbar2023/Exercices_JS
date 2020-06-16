const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'exercice-02.js'),
    resolve: {
      extensions: [
        '.js'
      ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'exercice-02/build')
    },
    devtool: 'inline-source-map'
};