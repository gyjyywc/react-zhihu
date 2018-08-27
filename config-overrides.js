const rewireStyl = require("react-app-rewire-stylus-modules");
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {
  config = rewireStyl(config, env);
  config.resolve.alias = {
    'api': resolve('src/api'),
    'common': resolve('src/common'),
    'assets': resolve('src/assets'),
    'components': resolve('src/components'),
    'router': resolve('src/router')
  }
  return config;
}