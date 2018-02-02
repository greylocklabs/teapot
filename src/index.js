/**
 * @file Exports all modules
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file for details.
 */

import * as errors from './errors';
import status from './status';

/** fill the map with relationships between status codes and errors */

const errorMap = new Map();

for (const e in errors) { // eslint-disable-line guard-for-in
    const proto = errors[e].prototype;
    if (proto instanceof errors.ClientError || proto instanceof errors.ServerError) {
        errorMap.set(errors[e].code(), errors[e]);
    }
}

/**
 * Create an instance of the correct HTTP error class from a status code
 * @public
 *
 * @param {string|number} statusCode - A 4xx or 5xx HTTP status code
 * @param {string} [message=*] - Optional error message; default depends on error
 * @param {Object} [properties] - Error properties to apply
 * @param {boolean} [properties.expose=*] - Whether or not to expose error to client; default depends on error
 * @param {Object} [properties.props] - Other properties to add to the created error
 *
 * @returns {ClientError|ServerError} HTTP error class instance
 *
 * @throws {Error} Thrown if statusCode is not 4xx or 5xx
 */
const createError = (statusCode, message, { expose, props } = {}) => {
    if (!status.error(statusCode)) {
        throw new Error(`Status code ${statusCode} is not a 4xx or 5xx HTTP error`);
    }

    const code = status(statusCode);
    const HTTPError = errorMap.get(code);

    return new HTTPError(message, { expose, props });
};

export { createError, errors, status };
