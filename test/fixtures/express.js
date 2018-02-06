/**
 * @file Express web server
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import express from 'express';

import teapot from '../../src';

const app = express();

app.get('/errors/:code', (req, res, next) => next(teapot.error(req.params.code)));

export default app;
