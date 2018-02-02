/**
 * @file Tests for http/errors
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017 Greylock Labs. See LICENSE file for details.
 */

import test from 'ava';

import { createError, errors, status } from '../../src/index';

test('Error classes', (t) => {
    let err;

    for (const e in errors) {
        if (errors[e].prototype instanceof errors.ClientError) {
            err = new errors[e]();

            t.true(err.expose);
            t.is(err.status, errors[e].code());
            t.is(err.message, status[err.status]);
        } else if (errors[e].prototype instanceof errors.ServerError) {
            err = new errors[e]();

            t.false(err.expose);
            t.is(err.status, errors[e].code());
            t.is(err.message, status[err.status]);
        } else if (errors[e].name === 'ClientError') {
            err = new errors[e](400, 'Message', { props: { custom: 1, expose: 0 } }); // expose should be ignored

            t.true(err.expose);
            t.is(err.message, 'Message');
            t.is(err.custom, 1);

            t.throws(() => {
                const badClientError = new errors[e](500); // must be 4xx
                t.true(badClientError.expose);
            }, Error);
        } else if (errors[e].name === 'ServerError') {
            err = new errors[e](500, 'Message', { props: { custom: 1, expose: 0 } }); // expose should be ignored

            t.false(err.expose);
            t.is(err.message, 'Message');
            t.is(err.custom, 1);

            t.throws(() => {
                const badServerError = new errors[e](400); // must be 5xx
                t.false(badServerError.expose);
            }, Error);
        } else {
            t.fail(`Unexpected member of errors module: ${errors[e]}`); // should not reach this
        }
    }
});

test('Create client error using createError function', (t) => {
    const notFoundErr = createError(404);

    t.true(notFoundErr.expose);
    t.is(notFoundErr.status, status.NOT_FOUND);
    t.is(notFoundErr.message, status[notFoundErr.status]);

    const notFoundErrWithMessage = createError(404, 'Custom message');

    t.is(notFoundErrWithMessage.message, 'Custom message');

    const notFoundErrWithExposeFalse = createError(404, undefined, { expose: false });

    t.is(notFoundErrWithExposeFalse.expose, false);

    const notFoundErrWithCustomProp = createError(404, undefined, { props: { x: 10 } });

    t.is(notFoundErrWithCustomProp.x, 10);
});

test('Create error using createError function should fail when statusCode is not 4xx or 5xx', (t) => {
    t.throws(() => {
        createError(200);
    }, Error);
});
