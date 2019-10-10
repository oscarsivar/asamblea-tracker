const withCSS = require("@zeit/next-css");

/**
 * https://github.com/zeit/next-plugins/issues/541#issuecomment-534863391
 *
 * @param {*} config Webpack configuration
 */
function HACK_removeMinimizeOptionFromCssLoaders(config) {
    config.module.rules.forEach(rule => {
        if (Array.isArray(rule.use)) {
            rule.use.forEach(u => {
                if (u.loader === "css-loader" && u.options) {
                    console.warn(
                        "[ hack ] Removing `minimize` option from `css-loader` entries in Webpack config"
                    );
                    delete u.options.minimize;
                }
            });
        }
    });
}

module.exports = withCSS({
    webpack(config) {
        HACK_removeMinimizeOptionFromCssLoaders(config);
        return config;
    }
});
