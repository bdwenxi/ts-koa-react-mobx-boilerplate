/**
 * @file webpack基础配置
 * @author zhangwenxi(zhangwenxi@baidu.com)
 */

import {Configuration} from 'webpack';
import {resolvePath} from './utils';
import {CheckerPlugin} from 'awesome-typescript-loader';

export default {
    context: resolvePath(),
    entry: {
        main: ['./src/index.tsx']
    },
    output: {
        path: resolvePath('./dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
} as Configuration;
