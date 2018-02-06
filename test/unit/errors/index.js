/**
 * @file Tests for HTTPError, ClientError, ServerError, and all subclasses
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import test from 'ava';

import teapot from '../../../src';
import { getErrorClassNames, randomErrorCode } from '../../utils';

test.beforeEach((t) => {
    t.context.randomErrorCode = randomErrorCode();
    t.context.randomClientErrorCode = randomErrorCode('client');
    t.context.randomServerErrorCode = randomErrorCode('server');
});

/** HTTPError */

test('teapot.HTTPError is an Error', (t) => {
    t.true(teapot.HTTPError.prototype instanceof Error);
});

test('teapot.HTTPError has all of the required properties', (t) => {
    const err = new teapot.HTTPError(t.context.randomErrorCode, teapot.status[t.context.randomErrorCode]);

    t.is(err.message, teapot.status[t.context.randomErrorCode]);
    t.is(typeof err.expose, 'boolean');
    t.is(err.status, t.context.randomErrorCode);
    t.is(err.status, err.statusCode);
});

test('teapot.HTTPError throws an Error when code is not 4xx or 5xx', (t) => {
    t.throws(() => {
        const err = new teapot.HTTPError(200); // eslint-disable-line no-unused-vars
    }, Error);
});

test('teapot.HTTPError ignores setting protected properties as part of props object', (t) => {
    const err = new teapot.HTTPError(t.context.randomErrorCode, 'Custom message', {
        props: {
            expose: 0,
            status: 0,
            statusCode: 0,
            name: 0,
            message: 0,
        },
    });

    for (const prop of [ 'expose', 'status', 'statusCode', 'name', 'message' ]) {
        t.not(err[prop], 0);
    }
});

/** ClientError */

test('teapot.ClientError is an HTTPError', (t) => {
    t.true(teapot.ClientError.prototype instanceof teapot.HTTPError);
});

test('teapot.ClientError has all of the required properties', (t) => {
    const err = new teapot.ClientError(t.context.randomClientErrorCode, teapot.status[t.context.randomClientErrorCode]);

    t.is(err.message, teapot.status[t.context.randomClientErrorCode]);
    t.true(err.expose);
    t.is(err.status, t.context.randomClientErrorCode);
    t.is(err.status, err.statusCode);
});

test('teapot.ClientError throws an Error when code is not 4xx', (t) => {
    t.throws(() => {
        const err = new teapot.ClientError(500); // eslint-disable-line no-unused-vars
    }, Error);
});

/** ServerError */

test('teapot.ServerError is an HTTPError', (t) => {
    t.true(teapot.ServerError.prototype instanceof teapot.HTTPError);
});

test('teapot.ServerError has all of the required properties', (t) => {
    const err = new teapot.ServerError(t.context.randomServerErrorCode, teapot.status[t.context.randomServerErrorCode]);

    t.is(err.message, teapot.status[t.context.randomServerErrorCode]);
    t.false(err.expose);
    t.is(err.status, t.context.randomServerErrorCode);
    t.is(err.status, err.statusCode);
});

test('teapot.ServerError throws an Error when code is not 5xx', (t) => {
    t.throws(() => {
        const err = new teapot.ServerError(400); // eslint-disable-line no-unused-vars
    }, Error);
});

/** All other error classes */

test('teapot.X sets the correct message and other properties for each HTTP error status code X', (t) => {
    for (const cls of getErrorClassNames()) {
        const err = new teapot[cls]();

        t.is(err.message, teapot.status[err.status]);
        t.is(typeof err.expose, 'boolean');
        t.is(err.status, err.statusCode);
        t.is(err.status, teapot[cls].code());
    }
});
