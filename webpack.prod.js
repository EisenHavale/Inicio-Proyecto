const HtmlWebPackPlugin = require('html-webpack-plugin');
const estilosGenerales = require('mini-css-extract-plugin');
const optimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const bableMinifyWpPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new optimizeCSSPlugin()],
        realContentHash: true,
    },
    output: {
        filename: 'main.[hash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /estilo_general\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]



            },
            {
                test: /estilo_general\.css$/,
                use: [
                    estilosGenerales.loader,
                    'css-loader'
                ]
            },

            {

                test: /\.hmtl$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: true,
                },
            }

        ]
    },


    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new estilosGenerales({
            filename: './estilo_general.[hash].css',
            ignoreOrder: false,
            
        }),

        new copyWebpackPlugin({
            patterns: [
                {
                    from: './src/assets', to: 'assets/',
                }
            ]
        }),
        new bableMinifyWpPlugin()

    ],

    

}