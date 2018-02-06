import Koa from 'koa';
import Router from 'koa-router';

import teapot from '../src';

const app = new Koa();
const router = new Router();

const statusCodes = teapot.status.codes; // all of the status codes

router.get('/health-check', async (ctx, next) => {
    await next();

    ctx.status = teapot.status.OK; // 200
    ctx.body = {
        status: 'good',
        message: teapot.status[200], // 'OK'
    };
});

router.get('/errors/404', () => {
    throw new teapot.NotFoundError('Nothing to see here!'); // 404
});

router.get('/errors/500', () => {
    throw new teapot.InternalServerError('Something broke!'); // 500; Koa will only show message in console
});

router.get('/errors/random', () => {
    const errorCodes = statusCodes.filter((c) => /4|5/.test(c.toString().charAt(0)));
    const code = errorCodes[Math.floor(Math.random() * errorCodes.length)];

    throw teapot.error(code); // Will have correct status code and default error message for code
});

router.get('/teapot', async (ctx, next) => {
    await next();

    const err = new teapot.ImATeapotError('Custom error message');

    ctx.status = teapot.status.IM_A_TEAPOT;
    ctx.body = {
        error: err.name,
        message: err.message,
        stack: err.stack,
    };
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('App is listening on port 3000...'); // eslint-disable-line no-console
});
