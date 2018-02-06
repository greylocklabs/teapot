/**
 * @file Test utilities
 * @module test
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import http from 'http';

import teapot from '../../src';

/**
 * Node.js http module STATUS_CODES keys converted to numbers
 * @type {number[]}
 */
export const statusCodes = Object.keys(http.STATUS_CODES).map(Number);

/**
 * Get an HTTP error code
 * @public
 *
 * @param {string} [type] - Optionally specify 'client' or 'server' error code
 *
 * @returns {number} Status code
 */
export const randomErrorCode = (type) => {
    let pattern;

    switch (type) {
        case 'server':
            pattern = /5/;
            break;
        case 'client':
            pattern = /4/;
            break;
        default:
            pattern = /4|5/;
    }

    const codes = statusCodes.filter((c) => pattern.test(c.toString().charAt(0)));
    return codes[Math.floor(Math.random() * codes.length)];
};

/**
 * Get a list of the error class names used in ClientError and ServerError subclasses
 * @public
 *
 * @returns {string[]} List of class names, i.e. 'NotFoundError'
 */
export const getErrorClassNames = () => {
    const formatted = Object.values(http.STATUS_CODES).map((msg) => msg.replace(/\s|-|'/g, ''));
    const names = [];

    for (let f of formatted) {
        if (f === 'Imateapot') {
            f = 'ImATeapot';
        }

        if (!(f.slice(-5) === 'Error')) {
            f = `${f}Error`;
        }

        if (teapot[f]) {
            names.push(f);
        }
    }

    return names;
};

