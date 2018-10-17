/**
 * @file 本地server路由文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import Router from 'koa-router';
import koaViews from 'koa-views';

import {resolvePath} from '../../scripts/utils';
import mockJsonData from '../utils/mockJsonData';

const router = new Router();

router.use(
    koaViews(
        resolvePath('./template/'),
        {
            map: {
                hbs: 'handlebars'
            }
        }
    )
);

router.get('/', async ctx => {
    await ctx.render(
        'index.hbs',
        {
            title: '可视化拖拽排序demo'
        }
    );
});

router.post(/^\/unit\/v2/, async function (ctx, next) {
    const path = ctx.originalUrl.replace(/\/unit\/v2\//, '');

    await next();

    ctx.type = 'application/json';
    ctx.body = await mockJsonData(path);
});

export default router;
