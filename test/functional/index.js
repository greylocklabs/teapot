/**
 * @file Test the usage of the module with common web frameworks
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import result from 'await-result';
import request from 'supertest';
import test from 'ava';

import expressApp from '../fixtures/express';
import koaApp from '../fixtures/koa';
import teapot from '../../src';
import { getErrorClassNames } from '../utils';

test('Error classes set the correct status codes and messages', async (t) => {
    for (const cls of getErrorClassNames()) {
        const code = teapot[cls].code();

        const [ , koaRes ] = await result(request(koaApp).get(`/errors/${code}`).expect(code)); // eslint-disable-line no-await-in-loop
        const [ , expressRes ] = await result(request(expressApp).get(`/errors/${code}`).expect(code)); // eslint-disable-line no-await-in-loop

        t.is(koaRes.status, code);
        t.is(koaRes.status, koaRes.statusCode);
        t.is(koaRes.status, expressRes.status);
        t.is(koaRes.status, expressRes.statusCode);

        t.is(koaRes.error.text, new teapot[cls]().message);
    }
});
