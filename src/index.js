/**
 * @file Exports all modules
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file for details.
 */

import status from './status';
import * as errors from './errors';

const errorMap = new Map();

for (const e in errors) {
    const proto = errors[e].prototype;
    if (proto instanceof errors.ClientError || proto instanceof errors.ServerError) {
        errorMap.set(errors[e].code(), errors[e]);
    }
}

/**
 * Module exports
 * @type {Object}
 */
const teapot = {
    status,

    /**
     * Create an HTTPError from a status code
     * @public
     *
     * @param {number|string} code - Status code
     * @param {string} message - Error message
     * @param {Object} [properties] - Optional error properties
     * @param {boolean} [properties.expose] - Whether or not to expose error to clients that support this property
     * @param {Object} [props] - Extra properties to add to the Error object
     *
     * @returns {HTTPError} Subclass of ClientError or ServerError
     */
    error(code, message, { expose, props } = {}) {
        if (!status.isError(code)) {
            throw new Error(`Invalid status code ${code} - must be 4xx or 5xx`);
        }

        const Err = errorMap.get(status(code));
        return new Err(message, { expose, props });
    },
};

export default Object.assign(teapot, errors);
