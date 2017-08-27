const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
    entry: './assets/js/app-main-script.js',
    output: {
        path: path.resolve(__dirname, './assets/js/'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\*.js$/,
                use: 'raw-loader' 
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
    ]
};