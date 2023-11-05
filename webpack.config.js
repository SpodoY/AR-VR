var path = require("path")
var webpack = require("webpack")

module.exports = {
    mode: "development",
    watch : true,
    entry : "./js/main.js",
    output : {
        path : path.resolve(__dirname, "public"),
        filename : "dist/main.bundle.js"
    },
    module : {
        rules :[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader : "babel-loader",
                    options : {
                        presets: ["@babel/preset-env"]
                    }
                }
            
            }
        ]
    },
    stats : {
        colors :true
    },
    devtool : "source-map"
}