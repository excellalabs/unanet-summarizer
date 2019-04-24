const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname),
      filename: 'unanet-summarizer.js'
    },
    module: {
      rules: [
        { test: /\.css$/, use: 'raw-loader' },
        { test: /\.tpl$/, use: 'raw-loader' }        
      ]
    }
};
