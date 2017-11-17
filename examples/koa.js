import Koa from 'koa';
import Router from 'koa-router';

import { errors, status } from '../src';

const app = new Koa();
const router = new Router();

router.get('/api', async (ctx, next) => {
    await next();

    ctx.status = status.OK; // 200
    ctx.message = status[200]; // 'OK'
    ctx.body = {
        api: 'running',
    };
});

router.get('/404', () => {
    throw new errors.NotFoundError('Nothing to see here!'); // error exposed to client by default
});

router.get('/500', () => {
    throw new errors.InternalServerError('Something broke!'); // logs actual error message but only shows Internal Server Error publicly
});

app.use(router.routes());

app.listen(3000);
