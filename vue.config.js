const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@img': path.join(__dirname, 'src/assets/img'),
                '@scss': path.join(__dirname, 'src/scss')
            }
        }
    }
};
