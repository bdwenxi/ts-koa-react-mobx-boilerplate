/**
 * @file webpack开发环境配置
 * @author simmons8616(simmons0616@gmail.com)
 */

import {Configuration} from 'webpack';
import webpackMerge from 'webpack-merge';
import basicConfig from './webpack.basic.config';

// 定义webpack配置合并策略
const devStrategy = webpackMerge.strategy(
    {
        'output': 'append',
        'module.rules': 'append'
    }
);

export default devStrategy(
    basicConfig,
    {
        mode: 'development',
        output: {
            publicPath: '/dist/'
        },
        devtool: 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.scss/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        }
    }
) as Configuration;
