const HtmlWebPackPlugin = require('html-webpack-plugin');
const estilosGenerales= require('mini-css-extract-plugin');
// const optimizeCSSPlugin= require('optimize-css-assets-webpack-plugin');  Este es para producción
const copyWebpackPlugin= require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    output:{
        clean:true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude:/estilo_general\.css$/,
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
                    minimize:true,
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
            filename: './estilo_general.css',
            ignoreOrder: false
        }),

        new copyWebpackPlugin({
           patterns: [
               {
                   from: './src/assets', to: 'assets/',
               }
           ]
        })

    ]

}