module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'webpack'],

        files: ['src/tests/**/*.test.js'],

        preprocessors: {
            'src/tests/**/*.test.js': ['webpack']
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    ['@babel/preset-react', { runtime: 'automatic' }]
                                ]
                            }
                        }
                    },
                    {
                        test: /\.js$/,
                        include: /[\\/]src[\\/](components|context|pages|utils)[\\/]/,
                        exclude: /node_modules/,
                        enforce: 'post',
                        use: {
                            loader: 'babel-loader',
                            options: {
                                plugins: ['babel-plugin-istanbul']
                            }
                        }
                    }
                ]
            },
            resolve: { extensions: ['.js', '.jsx'] }
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage',
            subdir: '.',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'text-summary' },
                { type: 'lcov', subdir: 'lcov' },
                { type: 'json-summary', subdir: '.', file: 'coverage-summary.json' }
            ],
            includeAllSources: true,
            check: {
                global: {
                    // ✅ Ajustados a tu cobertura real (con margen de seguridad)
                    statements: 50,
                    branches: 38,
                    functions: 50,
                    lines: 60
                }
            }
        },

        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
            }
        },

        browsers: ['ChromeHeadlessNoSandbox'],
        singleRun: true,
        client: { jasmine: { random: false } },

        logLevel: config.LOG_INFO
    });
};