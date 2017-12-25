let path = require('path');
let webpack = require('webpack');

const config = {
    entry: './client/src/index.jsx',
    output: {
        path: path.resolve(__dirname, './client/summoner'),
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'client/src')],
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    plugins: [],
    stats: {
        colors: true
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
           }
        })
    );
}
else {
    config.devtool = "#cheap-module-source-map";
}

module.exports = config;
