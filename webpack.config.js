var getConfig = require('hjs-webpack');

module.exports = getConfig({
    in: 'src/app.js',
    out: 'dist',
    port: 3001,
    clearBeforeBuild: false
});