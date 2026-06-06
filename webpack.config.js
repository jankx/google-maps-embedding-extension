const path = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        'google-maps-api': './google-maps-api/index.tsx',
        'google-maps-embed': './google-maps-embed/index.tsx',
    },
    output: {
        path: path.resolve(__dirname),
        // Each entry outputs directly to its block directory
        filename: (pathData) => {
            const name = pathData.chunk.name;
            return `blocks/${name}/index.js`;
        },
        clean: false,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@wordpress/blocks': ['wp', 'blocks'],
        '@wordpress/i18n': ['wp', 'i18n'],
        '@wordpress/block-editor': ['wp', 'blockEditor'],
        '@wordpress/components': ['wp', 'components'],
        '@wordpress/element': ['wp', 'element'],
        '@wordpress/data': ['wp', 'data'],
    },
    plugins: [
        new DependencyExtractionWebpackPlugin({
            outputFormat: 'php',
            combineAssets: false,
            useDefaults: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [require.resolve('@wordpress/babel-preset-default')],
                    },
                },
            },
        ],
    },
};
