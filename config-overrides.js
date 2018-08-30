const path = require('path')

const resolve = function (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {
  const rules = config.module.rules[1].oneOf
  rules.unshift({
    test: /\.styl$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      require.resolve('stylus-loader')
    ]
  })
  // config = rewireStyl(config, env);
  config.resolve.alias = {
    'api': resolve('src/api'),
    'store': resolve('src/store'),
    'common': resolve('src/common'),
    'assets': resolve('src/assets'),
    'components': resolve('src/components'),
    'router': resolve('src/router')
  }
  return config
}