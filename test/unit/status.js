/**
 * @file Tests for teapot.status function
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import http from 'http';

import test from 'ava';

import teapot from '../../src';

test('for each HTTP code message X in teapot.status.X there should be the correct HTTP code', (t) => {
    Object.values(http.STATUS_CODES).forEach((msg) => {
        const key = msg
            .replace(/\s|-/g, '_')
            .replace('\'', '')
            .toUpperCase();

        t.is(typeof teapot.status[key], 'number');
    });
});

test('teapot.status should contain node http module STATUS_CODES object', (t) => {
    t.true(Object.is(teapot.status.STATUS_CODES, http.STATUS_CODES));
});

test('teapot.status.codes should contain an array of status codes from http.STATUS_CODES', (t) => {
    for (const code in http.STATUS_CODES) {
        t.true(teapot.status.codes.includes(Number.parseInt(code)));
    }
});

test('teapot.status(x) throws a TypeError when x is not a number or string', (t) => {
    for (const i of [ [], {}, null, undefined, false, Symbol('x'), RegExp('s'), /pattern/ ]) {
        t.throws(() => {
            teapot.status(i);
        }, TypeError);
    }
});

test('teapot.status(x) throws an Error when x is not an HTTP status code or correct default message', (t) => {
    for (const i of [ 600, '108', 'Hello', 'Not Foundd', '200.1', 34 ]) {
        t.throws(() => {
            teapot.status(i);
        }, Error);
    }
});

test('teapot.status(x) returns the correct status code for all default HTTP status code messages', (t) => {
    Object.keys(http.STATUS_CODES).forEach((code) => {
        t.is(teapot.status(http.STATUS_CODES[code]), Number.parseInt(code));
        t.is(teapot.status(http.STATUS_CODES[code].toLowerCase()), Number.parseInt(code));
        t.is(teapot.status(http.STATUS_CODES[code].toUpperCase()), Number.parseInt(code));
    });
});

test('teapot.status(x) returns the correct status code for all string HTTP code inputs', (t) => {
    Object.keys(http.STATUS_CODES).forEach((code) => {
        t.is(teapot.status(code), Number.parseInt(code));
    });
});

test('teapot.status(x) returns the correct status code for all numeric HTTP code inputs', (t) => {
    Object.keys(http.STATUS_CODES).forEach((code) => {
        t.is(teapot.status(Number.parseInt(code)), Number.parseInt(code));
    });
});

test('teapot.status.isInfo(x) returns true for 1xx status codes and false otherwise', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /1/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.isInfo(code));
    });
});

test('teapot.status.isSuccess(x) returns true for 2xx status codes and false otherwise', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /2/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.isSuccess(code));
    });
});

test('teapot.status.isRedirect(x) returns true for 3xx status codes and false otherwise', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /3/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.isRedirect(code));
    });
});

test('teapot.status.isClientError(x) returns true for 4xx status codes and false otherwise', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /4/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.isClientError(code));
    });
});

test('teapot.status.isServerError(x) returns true for 5xx status codes and false otherwise', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /5/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.isServerError(code));
    });
});

test('teapot.status.isError(x) returns true for 4xx and 5xx status codes and false otherwise', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /4|5/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.isError(code));
    });
});

test('teapot.status[x](y) returns false when: x is a teapot.status method and y is not an http code', (t) => {
    [ 'isInfo', 'isSuccess', 'isRedirect', 'isClientError', 'isServerError', 'isError' ].forEach((method) => {
        t.false(teapot.status[method](null));
    });
});

test('teapot.status.codes.infoCodes contains 1xx status codes', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /1/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.codes.infoCodes.includes(Number.parseInt(code)));
    });
});

test('teapot.status.codes.successCodes contains 2xx status codes', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /2/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.codes.successCodes.includes(Number.parseInt(code)));
    });
});

test('teapot.status.codes.redirectCodes contains 3xx status codes', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /3/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.codes.redirectCodes.includes(Number.parseInt(code)));
    });
});

test('teapot.status.codes.clientErrorCodes contains 4xx status codes', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /4/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.codes.clientErrorCodes.includes(Number.parseInt(code)));
    });
});

test('teapot.status.codes.serverErrorCodes contains 5xx status codes', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /5/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.codes.serverErrorCodes.includes(Number.parseInt(code)));
    });
});

test('teapot.status.codes.errorCodes contains 4xx and 5xx status codes', (t) => {
    Object.keys(http.STATUS_CODES).filter((c) => /4|5/.test(c.charAt(0))).forEach((code) => {
        t.true(teapot.status.codes.errorCodes.includes(Number.parseInt(code)));
    });
});
