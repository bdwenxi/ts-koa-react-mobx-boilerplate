/**
 * @file 基础工具类文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import path from 'path';

export function resolvePath(refPath = '') {
    return path.resolve(__dirname, '..', '..', refPath);
}
