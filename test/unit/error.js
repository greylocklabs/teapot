/**
 * @file Tests for teapot.error function
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import test from 'ava';

import teapot from '../../src';
import { randomErrorCode } from '../utils';

test.beforeEach((t) => {
    t.context.randomErrorCode = randomErrorCode();
    t.context.randomClientErrorCode = randomErrorCode('client');
    t.context.randomServerErrorCode = randomErrorCode('server');
});

test('teapot.error creates an HTTPError', (t) => {
    const err = teapot.error(t.context.randomErrorCode);

    t.true(err instanceof teapot.HTTPError);
});

test('teapot.error creates a ClientError when given a 4xx code', (t) => {
    const err = teapot.error(t.context.randomClientErrorCode);

    t.true(err instanceof teapot.ClientError);
});

test('teapot.error creates a ServerError when given a 5xx code', (t) => {
    const err = teapot.error(t.context.randomServerErrorCode);

    t.true(err instanceof teapot.ServerError);
});

test('teapot.error creates the correct HTTPError subclass for all 4xx and 5xx codes', (t) => {
    let err;

    for (const status of teapot.status.codes) {
        if (teapot.status.isError(status)) {
            err = teapot.error(status);

            if (status.toString().charAt(0) === '4') {
                t.true(err instanceof teapot.ClientError);
            } else {
                t.true(err instanceof teapot.ServerError);
            }
        }
    }
});

test('teapot.error creates an error with only the required code parameter', (t) => {
    const err = teapot.error(t.context.randomErrorCode);

    t.is(err.message, teapot.status[t.context.randomErrorCode]);
    t.is(typeof err.expose, 'boolean');
    t.is(err.status, t.context.randomErrorCode);
    t.is(err.status, err.statusCode);
    t.true(err instanceof teapot.HTTPError);
});

test('teapot.error creates an error with a custom message', (t) => {
    const msg = 'Custom message';
    const err = teapot.error(t.context.randomErrorCode, msg);

    t.is(err.message, msg);
    t.is(typeof err.expose, 'boolean');
    t.is(err.status, t.context.randomErrorCode);
    t.is(err.status, err.statusCode);
    t.true(err instanceof teapot.HTTPError);
});

test('teapot.error creates a ClientError and changes expose to false', (t) => {
    const err = teapot.error(t.context.randomClientErrorCode, undefined, { expose: false });

    t.is(err.message, teapot.status[t.context.randomClientErrorCode]);
    t.false(err.expose);
    t.is(err.status, t.context.randomClientErrorCode);
    t.is(err.status, err.statusCode);
    t.true(err instanceof teapot.ClientError);
});

test('teapot.error creates a ServerError and changes expose to true', (t) => {
    const err = teapot.error(t.context.randomServerErrorCode, undefined, { expose: true });

    t.is(err.message, teapot.status[t.context.randomServerErrorCode]);
    t.true(err.expose);
    t.is(err.status, t.context.randomServerErrorCode);
    t.is(err.status, err.statusCode);
    t.true(err instanceof teapot.ServerError);
});

test('teapot.error creates an error with custom properties', (t) => {
    const err = teapot.error(t.context.randomErrorCode, undefined, { props: { a: 0, b: true, c: 'x' } });

    t.is(err.message, teapot.status[t.context.randomErrorCode]);
    t.is(typeof err.expose, 'boolean');
    t.is(err.status, t.context.randomErrorCode);
    t.is(err.status, err.statusCode);
    t.true(err instanceof teapot.HTTPError);

    t.is(err.a, 0);
    t.true(err.b);
    t.is(err.c, 'x');
});

test('teapot.error throws an Error when the supplied code is not 4xx or 5xx', (t) => {
    t.throws(() => {
        teapot.error(200);
    }, Error);
});
