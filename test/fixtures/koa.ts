import http from 'http';

import Koa, { Context } from 'koa';
import Router from 'koa-router';

import teapot from '../../src';

const app = new Koa();
const router = new Router();

router.get('/errors/:code', (ctx: Context): void => {
  throw teapot.error(ctx.params.code);
});

app.use(router.routes());

const server = http.createServer(app.callback());

export default server;
