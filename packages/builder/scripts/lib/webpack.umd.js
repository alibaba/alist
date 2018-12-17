const babelLoaderOpts = require('../lib/babelConfig');
const path = require('path');
const autoprefixer = require('autoprefixer')

const paths = require('./paths');
const mode = 'production';
const root = process.cwd();
const { resolveApp } = paths;
const dist = path.join(root, 'dist');

function getConfig (entryOuts) {
    const basicConfig = {
        mode,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: require.resolve('babel-loader'),
                        options: babelLoaderOpts,
                    },
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [
                      require.resolve('style-loader'),
                      {
                        loader: require.resolve('css-loader'),
                        options: {
                          importLoaders: 1
                        }
                      },
                      {
                        loader: require.resolve('postcss-loader'),
                        options: {
                          ident: 'postcss',
                          plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                              browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9' // React doesn't support IE8 anyway
                              ],
                              flexbox: 'no-2009'
                            })
                          ]
                        }
                      },
                      require.resolve('fast-sass-loader')
                    ]
                  },
            ],
        },
        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
            },
        },
        plugins: [
            // ...
            function()
            {
                this.plugin("done", function(stats)
                {
                    if (stats.compilation.errors && stats.compilation.errors.length)
                    {
                        console.log(stats.compilation.errors);
                        process.exit(1);
                    }
                });
            }
            // ...
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    };
    
    const config = entryOuts.map(entryOutItem => {
        entryOutItem.entry = resolveApp(entryOutItem.entry);                
        if (entryOutItem.output.path) {
            entryOutItem.output.path = path.resolve(dist, entryOutItem.output.path);
        } else {
            entryOutItem.output.path = dist;
        }

        entryOutItem.output.libraryTarget = 'umd';
        
        
        return Object.assign({}, entryOutItem, basicConfig);
    });

    return config;
}


module.exports = getConfig;
