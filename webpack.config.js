const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'unanet-summarizer-release.js'
    },
    module: {
      rules: [
        { test: /\.css$/, use: 'raw-loader' },
        { test: /\.tpl$/, use: 'raw-loader' }        
      ]
    }
};
