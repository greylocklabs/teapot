/**
 * @file Exports status() function and other useful utilities and constants
 * @module status
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file for details.
 */

import http from 'http';

/**
 * Fills in the status.codes array, and allows for things like status[404] and status['not found']
 * @private
 *
 * @param {Function} func - The status function to add properties to
 *
 * @returns {number[]} Array of status codes, in order
 */
const addStatusCodesAndMessages = (func) => {
    const codes = http.STATUS_CODES;
    const list = [];

    Object.keys(codes).forEach((code) => {
        const msg = codes[code];
        const num = Number.parseInt(code);

        func[msg] = num;
        func[msg.toLowerCase()] = num;
        func[num] = msg;
        func[code] = msg;

        list.push(num);
    });

    return list;
};

/**
 * Takes in an HTTP status code or its associated message and returns the code
 * @public
 *
 * @param {string|number} input - The status code or message, i.e. 404, '404', 'not found', or 'Not Found'
 *
 * @returns {number} HTTP status code
 *
 * @throws {Error} Invalid status code or message is provided
 * @throws {TypeError} Input is not a number or string
 */
const status = (input) => {
    if (typeof input === 'number') {
        if (status[input]) {
            return input;
        }

        throw new Error(`Invalid status code ${input}`);
    } else if (typeof input === 'string') {
        if (isNaN(input)) { // eslint-disable-line no-restricted-globals
            const code = status[input.toLowerCase()];

            if (code) {
                return code;
            }

            throw new Error(`Invalid status message ${input}`);
        }

        return status(Number.parseInt(input));
    }

    throw new TypeError('Input must be a number or string');
};

/**
 * Check if a given status code is a 1xx information response
 * @public
 *
 * @param {string|number} input - Status code
 *
 * @returns {boolean} True if code is 1xx
 */
status.info = (input) => status.codes.includes(Number.parseInt(input)) && String(input).charAt(0) === '1';

/**
 * Check if a given status code is a 2xx success response
 * @public
 *
 * @param {string|number} input - Status code
 *
 * @returns {boolean} True if code is 2xx
 */
status.success = (input) => status.codes.includes(Number.parseInt(input)) && String(input).charAt(0) === '2';

/**
 * Check if a given status code is a 3xx redirect response
 * @public
 *
 * @param {string|number} input - Status code
 *
 * @returns {boolean} True if code is 3xx
 */
status.redirect = (input) => status.codes.includes(Number.parseInt(input)) && String(input).charAt(0) === '3';

/**
 * Check if a given status code is a 4xx client error response
 * @public
 *
 * @param {string|number} input - Status code
 *
 * @returns {boolean} True if code is 4xx
 */
status.clientError = (input) => status.codes.includes(Number.parseInt(input)) && String(input).charAt(0) === '4';

/**
 * Check if a given status code is a 5xx server error response
 * @public
 *
 * @param {string|number} input - Status code
 *
 * @returns {boolean} True if code is 5xx
 */
status.serverError = (input) => status.codes.includes(Number.parseInt(input)) && String(input).charAt(0) === '5';

/**
 * Check if a given status code is a 4xx or 5xx response
 * @public
 *
 * @param {string|number} input - Status code
 *
 * @returns {boolean} True if code is 4xx or 5xx
 */
status.error = (input) => status.clientError(input) || status.serverError(input);

/**
 * Copy of STATUS_CODES object from Node's http module
 * @type {Object}
 */
status.STATUS_CODES = http.STATUS_CODES; // copy over http.STATUS_CODES object for convenience

/**
 * Array of status codes
 * @type {number[]}
 */
status.codes = addStatusCodesAndMessages(status); // allow for status[404], status['not found'], and status.codes array

status.CONTINUE = 100;
status.SWITCHING_PROTOCOLS = 101;
status.PROCESSING = 102;

status.OK = 200;
status.CREATED = 201;
status.ACCEPTED = 202;
status.NON_AUTHORITATIVE_INFORMATION = 203;
status.NO_CONTENT = 204;
status.RESET_CONTENT = 205;
status.PARTIAL_CONTENT = 206;
status.MULTI_STATUS = 207;
status.ALREADY_REPORTED = 208;
status.IM_USED = 226;

status.MULTIPLE_CHOICES = 300;
status.MOVED_PERMANENTLY = 301;
status.FOUND = 302;
status.SEE_OTHER = 303;
status.NOT_MODIFIED = 304;
status.USE_PROXY = 305;
status.TEMPORARY_REDIRECT = 307;
status.PERMANENT_REDIRECT = 308;

status.BAD_REQUEST = 400;
status.UNAUTHORIZED = 401;
status.PAYMENT_REQUIRED = 402;
status.FORBIDDEN = 403;
status.NOT_FOUND = 404;
status.METHOD_NOT_ALLOWED = 405;
status.NOT_ACCEPTABLE = 406;
status.PROXY_AUTHENTICATION_REQUIRED = 407;
status.REQUEST_TIMEOUT = 408;
status.CONFLICT = 409;
status.GONE = 410;
status.LENGTH_REQUIRED = 411;
status.PRECONDITION_FAILED = 412;
status.PAYLOAD_TOO_LARGE = 413;
status.URI_TOO_LONG = 414;
status.UNSUPPORTED_MEDIA_TYPE = 415;
status.RANGE_NOT_SATISFIABLE = 416;
status.EXPECTATION_FAILED = 417;
status.IM_A_TEAPOT = 418;
status.MISDIRECTED_REQUEST = 421;
status.UNPROCESSABLE_ENTITY = 422;
status.LOCKED = 423;
status.FAILED_DEPENDENCY = 424;
status.UNORDERED_COLLECTION = 425;
status.UPGRADE_REQUIRED = 426;
status.PRECONDITION_REQUIRED = 428;
status.TOO_MANY_REQUESTS = 429;
status.REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
status.UNAVAILABLE_FOR_LEGAL_REASONS = 451;

status.INTERNAL_SERVER_ERROR = 500;
status.NOT_IMPLEMENTED = 501;
status.BAD_GATEWAY = 502;
status.SERVICE_UNAVAILABLE = 503;
status.GATEWAY_TIMEOUT = 504;
status.HTTP_VERSION_NOT_SUPPORTED = 505;
status.VARIANT_ALSO_NEGOTIATES = 506;
status.INSUFFICIENT_STORAGE = 507;
status.LOOP_DETECTED = 508;
status.BANDWIDTH_LIMIT_EXCEEDED = 509;
status.NOT_EXTENDED = 510;
status.NETWORK_AUTHENTICATION_REQUIRED = 511;

export default status;
