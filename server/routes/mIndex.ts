import Router from 'koa-router';
const router = new Router();

router.get('mHome', '/', async function (ctx, _next) {
    ctx.type = 'text/html';
    ctx.body = 'mobile';
});

export default router;
