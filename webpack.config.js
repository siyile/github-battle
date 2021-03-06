var path = require("path"),
HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["@babel/polyfill", "whatwg-fetch", "./app/index.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)/, use: 'babel-loader'},
            {test: /\.css/, use: ['style-loader', 'css-loader']}
        ]
    },
    mode: 'development',
    plugins: [
        new HTMLWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,
    },
}