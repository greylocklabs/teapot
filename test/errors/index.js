/**
 * @file Tests for http/errors
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017 Greylock Labs. See LICENSE file for details.
 */

import test from 'ava';

import { errors, status } from '../../src/index';

test('Error classes', (t) => {
    let err;

    for (const e in errors) {
        if (errors[e].prototype instanceof errors.ClientError) {
            err = new errors[e]();

            t.true(err.expose);
            t.is(err.message, status[err.status]);
        } else if (errors[e].prototype instanceof errors.ServerError) {
            err = new errors[e]();

            t.false(err.expose);
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
