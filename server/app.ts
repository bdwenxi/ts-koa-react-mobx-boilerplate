/**
 * @file 本地server启动文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import Koa, {Middleware, Context} from 'koa';
import koaLogger from 'koa-logger';
import koaBody from 'koa-body';
import koaWebpack from 'koa-webpack';
// 引入http友好的错误对象工具类
import Boom from 'boom';
import MobileDetect from 'mobile-detect';
import webpack from 'webpack';

import pcRouter from './routes';
import mRouter from './routes/mIndex';
import paddleRouter from './routes/paddleRoutes';

import devConfig from '../scripts/webpack.dev.config';

const app = new Koa();
const compiler = webpack(devConfig);

function pcAndMobileRouter() {
    return function (ctx: Context, next: () => Promise<any>) {
        const md = new MobileDetect(ctx.headers['user-agent']).mobile();

        if (!!md) {
            return mRouter.routes()(ctx, next);
        }

        return pcRouter.routes()(ctx, next);
    };
}

async function startKoaApp() {
    let middleware: Middleware = () => {};
    const startServer = function (port: string, callback: () => void) {
        app.listen(port, callback);
    };

    try {
        middleware = await koaWebpack({compiler});
    }
    catch (e) {
        console.log(e);
    }

    // 使用koa-webpack中间件做hmr
    app.use(middleware);

    app.use(koaLogger());
    app.use(koaBody());

    // app主模块挂载路由
    app.use(pcAndMobileRouter());

    // 以paddlepaddle开头的都走paddle模块路由
    app.use(paddleRouter.routes());

    app.use(
        pcRouter.allowedMethods(
            {
                throw: true,
                notImplemented: () => Boom.notImplemented(),
                methodNotAllowed: () => Boom.methodNotAllowed()
            }
        )
    );

    return Promise.resolve(startServer);
}

export default startKoaApp();
