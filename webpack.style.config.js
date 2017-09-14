var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractLess = new ExtractTextPlugin('dist/app.css');

module.exports = {
    entry: [
        "./libs/bootstrap/bootstrap.min.css",
        './app/index.less',
    ],
    devtool: 'source-map',
    output: {
        filename: 'dist/app.css'
    },
    module: {
        rules: [
            {
                test: /\.less|css$/,
                //include: path.join(__dirname, 'app/MindMap/Web'),
                use: extractLess.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        // {
                        //     loader: "resolve-url-loader"
                        // },
                        {
                            loader: "less-loader", options: {
                                // relativeUrls: false
                            }
                        }],
                    // use style-loader in development
                    fallback: "style-loader",
                    // use: ["css-loader", "less-loader"]
                })
            },
            // { test: /\.ttf$/, loader: 'file' },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader', options: {
                    limit: 100000,
                    useRelativePath: true,
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        extractLess
    ]
};