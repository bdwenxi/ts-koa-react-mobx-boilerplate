import Router from 'koa-router';

const router = new Router({
    prefix: '/paddlepaddle'
});

router.get('/', function (ctx) {
    ctx.type = 'text/html';
    ctx.body = 'paddlepaddle';
});

export default router;
