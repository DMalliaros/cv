const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
const NunjucksWebpackPlugin = require( "nunjucks-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const jsonContext = require('./src/json/jsonContext.json');
const jsonSkills = require('./src/json/skills.json');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const _ =  require('lodash');

const extractLess =  new ExtractTextPlugin({ // Extracrs the compiled styles from their bundled js module to a .css file
    filename: 'styles/styles.css',
    disable: false,
    allChunks: true
});

const extractNunjucks = new NunjucksWebpackPlugin({

    templates: [
        {
            from: path.join(__dirname, 'src/templates', 'index.njk')
            ,to: path.resolve(__dirname, 'index.html')
            , context: _.extend(jsonContext, {skills:jsonSkills})
            , writeToFileEmit: true
        }
    ]
    , configure: (path.join(__dirname, 'src/templates'),{watch: true})
});

module.exports = env => {
    return {
        context: resolve('')
        , entry: {
            index: './src/js/index.js'
        }
        , output: {
            filename: 'scripts/[name].bundle.js',
            path: path.join(__dirname, 'dist')
        }
        , resolve: {
            alias: {
                'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
                , 'styles': path.join(__dirname, 'src/less')
                , 'modules': path.join(__dirname, 'node_modules')
            }
        }
        , devtool: env.prod ? 'source-map' : 'eval'
        , devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 9000
        }
        , module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    },
                    exclude: /(node_modules)/
                }
                , {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader', 'less-loader']
                    }),
                    exclude: /(node_modules|bower_components)/
                }
                , {
                    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.png($|\?)/,
                    loader: 'file-loader?publicPath=../&name=./fonts/[hash].[ext]'
                }

            ]
        }
        , plugins: [
            new webpack.ProvidePlugin({
                $: "jquery"
                , jQuery: "jquery"
            })
            , extractLess
            , extractNunjucks
            , new CopyWebpackPlugin([
                {from: 'src/img/favicon.ico', to: './'}
                , {from: 'src/img/', to: 'img'}
            ])
        ]
    }
};
