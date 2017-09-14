var webpack = require("webpack");
var configJs = require("./webpack.js.config");
var configCss = require("./webpack.style.config");

webpack(configJs);
webpack(configCss);