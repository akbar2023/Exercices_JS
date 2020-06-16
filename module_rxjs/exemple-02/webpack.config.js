const path = require("path");

module.exports = {
  entry: path.normalize(`${__dirname}/exemple-02.js`),
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [
      ".js"
    ]
  },
  output: {
    path: path.normalize(`${__dirname}`),
    filename: `bundle.js`
  }
}