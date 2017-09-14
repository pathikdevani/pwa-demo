/**
 * Created by sambitd on 19/7/17.
 */
var path = require("path");
var express = require("express");
var webpack = require("webpack");


var configJs = require("./webpack.js.config");
var configCss = require("./webpack.style.config");

var compilerJs = webpack(configJs);
var compilerCss = webpack(configCss);


var port = 2020;
var app = express();


app.use(require('webpack-dev-middleware')(compilerJs, { noInfo: true }));
app.use(require('webpack-dev-middleware')(compilerCss, { noInfo: true }));

app.use(require('webpack-hot-middleware')(compilerJs));
app.use(require('webpack-hot-middleware')(compilerCss));





app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/data', function (req, res) {
    res.json(require("./app/data"));
});

app.use(express.static(process.cwd()));





app.listen(port, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://0.0.0.0:%s', port);
});
