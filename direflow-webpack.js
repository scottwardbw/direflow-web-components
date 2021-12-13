const { webpackConfig } = require('direflow-scripts');
const webpack = require('webpack');

/**
 * Webpack configuration for Direflow Component
 * Additional webpack plugins / overrides can be provided here
 */
module.exports = (config, env) => ({
    ...webpackConfig(config, env)
    // Add your own webpack config here (optional)
});
