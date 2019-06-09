const path = require('path')
	,resolve = path.resolve
	,webpack = require('webpack')
	,NunjucksWebpackPlugin = require( "nunjucks-webpack-plugin")
	,ExtractTextPlugin = require("extract-text-webpack-plugin")
	,ChunkHashReplacePlugin = require('chunkhash-replace-dm-webpack-plugin')
	,CopyWebpackPlugin = require('copy-webpack-plugin')
	,jsonContext = require('./src/json/jsonContext.json')
	,jsonSkills = require('./src/json/skills.json')
    ,CleanWebpackPlugin = require('clean-webpack-plugin')
	,_ =  require('lodash')
    , outpupFolder = path.join(__dirname, 'dist')
    , tmpFolder = path.join(__dirname, 'tmp');


const extractNunjucks = new NunjucksWebpackPlugin({

    templates: [
        {
            from: path.join(__dirname, 'src/templates', 'index.njk')
            ,to: path.resolve(__dirname, 'tmp/index.html')
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
            filename: `scripts/[name]${env.prod?'.[chunkhash]':''}.bundle.js`,
            path: outpupFolder
            ,publicPath: '/cv/dist/',
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
            contentBase: path.join(__dirname),
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
            new CleanWebpackPlugin( outpupFolder )
            , new CleanWebpackPlugin( tmpFolder )
            , new webpack.ProvidePlugin({
                $: "jquery"
                , jQuery: "jquery"
            })

            , extractNunjucks
            , new ChunkHashReplacePlugin({
                src: 'tmp/index.html',
                dest: 'index.html',
            })
            , new ExtractTextPlugin({ // Extracrs the compiled styles from their bundled js module to a .css file
                filename: `styles/styles${env.prod?'.[chunkhash]':''}.css`,
                disable: false,
                allChunks: true
            })
            , new CopyWebpackPlugin([
                {from: 'src/img/favicon.ico', to: './'}
                , {from: 'src/img/', to: 'img'}
            ])
        ]
    }
};
