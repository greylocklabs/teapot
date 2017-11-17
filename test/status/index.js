/**
 * @file Tests for http/status
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017 Greylock Labs. See LICENSE file for details.
 */

import http from 'http';

import test from 'ava';

import { status } from '../../src/index';

test('status(x) throws a TypeError when x is not a number or string', (t) => {
    const inputs = [ [], {}, status, null, false, Symbol('s') ];

    for (const i of inputs) {
        t.throws(() => {
            status(i);
        }, TypeError);
    }
});

test('status(x) throws an Error when x is not a valid status code or message', (t) => {
    const inputs = [ 600, '108', 'Hello World', 'Not Foundd' ];

    for (const i of inputs) {
        t.throws(() => {
            status(i);
        }, Error);
    }
});

test('status(x) returns the correct status codes when x is a valid status code or message', (t) => {
    t.is(status(400), 400);
    t.is(status('201'), 201);
    t.is(status('Not Implemented'), 501);
    t.is(status('not found'), 404);
    t.is(status('CrEaTeD'), 201);
});

test('status.X returns the correct status codes for various X', (t) => {
    t.is(status.OK, 200);
    t.is(status.INTERNAL_SERVER_ERROR, 500);
    t.is(status.METHOD_NOT_ALLOWED, 405);
    t.is(status.MOVED_PERMANENTLY, 301);
});

test('status[x] returns correct messages when x is a status code', (t) => {
    t.is(status[404], 'Not Found');
    t.is(status['201'], 'Created');
    t.is(status['999'], undefined);
});

test('status[x] returns correct codes when x is a message', (t) => {
    t.is(status['Not Found'], 404);
    t.is(status.ok, 200);
    t.is(status.CREATed, undefined);
    t.is(status['fake message'], undefined);
});

test('status.STATUS_CODES is the same as http.STATUS_CODES', (t) => {
    t.true(Object.is(status.STATUS_CODES, http.STATUS_CODES));
});

test('status.codes array includes correct status codes', (t) => {
    Object.keys(status.STATUS_CODES).forEach((code) => {
        const num = Number.parseInt(code);

        t.true(status.codes.includes(num));
    });
});

test('status.info(x) returns true when code is 1xx', (t) => {
    t.true(status.info(100));
    t.true(status.info(102));
    t.true(status.info('101'));
});

test('status.info(x) returns false when code is not 1xx', (t) => {
    t.false(status.info(200));
    t.false(status.info('201'));
});

test('status.info(x) returns false when code is invalid', (t) => {
    t.false(status.info(false));
    t.false(status.info([]));
    t.false(status.info(999));
});

test('status.success(x) returns true when code is 2xx', (t) => {
    t.true(status.success(200));
    t.true(status.success(201));
    t.true(status.success('204'));
});

test('status.success(x) returns false when code is not 2xx', (t) => {
    t.false(status.success(100));
    t.false(status.success('301'));
});

test('status.success(x) returns false when code is invalid', (t) => {
    t.false(status.success(false));
    t.false(status.success([]));
    t.false(status.success(999));
});

test('status.redirect(x) returns true when code is 3xx', (t) => {
    t.true(status.redirect(301));
    t.true(status.redirect(304));
    t.true(status.redirect('307'));
});

test('status.redirect(x) returns false when code is not 3xx', (t) => {
    t.false(status.redirect(405));
    t.false(status.redirect('201'));
});

test('status.redirect(x) returns false when code is invalid', (t) => {
    t.false(status.redirect(false));
    t.false(status.redirect([]));
    t.false(status.redirect(999));
});

test('status.clientError(x) returns true when code is 4xx', (t) => {
    t.true(status.clientError(401));
    t.true(status.clientError(404));
    t.true(status.clientError('405'));
});

test('status.clientError(x) returns false when code is not 4xx', (t) => {
    t.false(status.clientError(500));
    t.false(status.clientError('201'));
});

test('status.clientError(x) returns false when code is invalid', (t) => {
    t.false(status.clientError(false));
    t.false(status.clientError([]));
    t.false(status.clientError(999));
});

test('status.serverError(x) returns true when code is 5xx', (t) => {
    t.true(status.serverError(501));
    t.true(status.serverError(503));
    t.true(status.serverError('500'));
});

test('status.serverError(x) returns false when code is not 5xx', (t) => {
    t.false(status.serverError(405));
    t.false(status.serverError('201'));
});

test('status.serverError(x) returns false when code is invalid', (t) => {
    t.false(status.serverError(false));
    t.false(status.serverError([]));
    t.false(status.serverError(999));
});

test('status.error(x) returns true when code is 4xx/5xx', (t) => {
    t.true(status.error(401));
    t.true(status.error(503));
    t.true(status.error('409'));
    t.true(status.error('502'));
});

test('status.error(x) returns false when code is not 4xx/5xx', (t) => {
    t.false(status.error(301));
    t.false(status.error('200'));
});

test('status.error(x) returns false when code is invalid', (t) => {
    t.false(status.error(false));
    t.false(status.error([]));
    t.false(status.redirect(999));
});
