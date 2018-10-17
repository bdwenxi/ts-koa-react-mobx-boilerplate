/**
 * @file 渲染handlebars模板工具文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import {IRouterContext} from 'koa-router';
import fs from 'fs';
import {promisify} from 'util';
import handlebars from 'handlebars';

import {resolvePath} from '../../scripts/utils';

const readFile = promisify(fs.readFile);

export default function renderHbs(ctx: IRouterContext, next: () => Promise<any>) {
    return async function (module: string, data: {[key: string]: any}) {
        const hbsPath = resolvePath(`./template/${module}.hbs`);
        let hbsBuffer: Buffer = Buffer.from('');

        try {
            hbsBuffer = await readFile(hbsPath);
        }
        catch (e) {
            console.log(e);
        }

        const hbsRenderer = handlebars.compile(hbsBuffer.toString());

        await next();
        ctx.type = 'text/html';
        ctx.body = hbsRenderer(data);
    };
}
