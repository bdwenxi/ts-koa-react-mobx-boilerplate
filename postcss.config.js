/**
 * @file postcss配置
 * @author simmons8616(simmons0616@gmail.com)
 */

const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['ie > 1', 'chrome > 1', 'ff > 1']
        })
    ]
};
