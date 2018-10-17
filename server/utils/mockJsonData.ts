/**
 * @file 模拟后端数据工具类文件
 * @author zhangwenxi(zhangwenxi@baidu.com)
 */

import fs from 'fs';
import {promisify} from 'util';
import {resolvePath} from '../../scripts/utils';

const readFile = promisify(fs.readFile);

export default async function mockJsonData(path: string) {
    const mockDataPath = resolvePath(`./mock/${path}.json`);
    let mockDataBuffer: Buffer;

    try {
        mockDataBuffer = await readFile(mockDataPath);
    }
    catch (e) {
        return Promise.reject(e);
    }

    const mockDataJson = JSON.parse(mockDataBuffer.toString());

    return Promise.resolve(mockDataJson);
}
