/**
 * @file 基础工具类文件
 * @author zhangwenxi(zhangwenxi@baidu.com)
 */

import path from 'path';

export function resolvePath(refPath = '') {
    return path.resolve(__dirname, '..', '..', refPath);
}
