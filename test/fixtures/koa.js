/**
 * @file Koa web server
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import http from 'http';

import Koa from 'koa';
import Router from 'koa-router';

import teapot from '../../src';

const app = new Koa();
const router = new Router();

router.get('/errors/:code', (ctx) => {
    throw teapot.error(ctx.params.code);
});

app.use(router.routes());

const server = http.createServer(app.callback());

export default server;
