/**
 * @file Classes for server-side (5xx) errors
 * @module errors/server
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file for details.
 */

import status from '../../status';

/**
 * Represents a 5xx error
 * @extends Error
 */
export class ServerError extends Error {
    /**
     * Creates a ServerError instance
     * @public
     *
     * @param {number|string} code - Status code
     * @param {string} message - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     *
     * @throws {Error} If code parameter is not 5xx
     */
    constructor(code, message, { expose = false, props = {} } = {}) {
        super(message);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.expose = expose; // for koa

        if (!status.serverError(code)) {
            throw new Error(`Invalid status code ${code} - must be 5xx`);
        }

        this.status = code;
        this.statusCode = code; // for compatibility purposes

        for (const key in props) { // add custom properties
            if (![ 'expose', 'status', 'statusCode', 'name', 'message' ].includes(key)) {
                this[key] = props[key];
            }
        }
    }
}

/**
 * Represents a 500 Internal Server response
 * @extends ServerError
 */
export class InternalServerError extends ServerError {
    /**
     * Creates an InternalServerError instance
     * @public
     *
     * @param {string} [message='Internal Server Error'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.INTERNAL_SERVER_ERROR], { expose = false, props = {} } = {}) {
        super(status.INTERNAL_SERVER_ERROR, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.INTERNAL_SERVER_ERROR;
    }
}

/**
 * Represents a 501 Not Implemented response
 * @extends ServerError
 */
export class NotImplementedError extends ServerError {
    /**
     * Creates a NotImplementedError instance
     * @public
     *
     * @param {string} [message='Not Implemented'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.NOT_IMPLEMENTED], { expose = false, props = {} } = {}) {
        super(status.NOT_IMPLEMENTED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.NOT_IMPLEMENTED;
    }
}

/**
 * Represents a 502 Bad Gateway response
 * @extends ServerError
 */
export class BadGatewayError extends ServerError {
    /**
     * Creates a BadGatewayError instance
     * @public
     *
     * @param {string} [message='Bad Gateway'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.BAD_GATEWAY], { expose = false, props = {} } = {}) {
        super(status.BAD_GATEWAY, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.BAD_GATEWAY;
    }
}

/**
 * Represents a 503 Service Unavailable response
 * @extends ServerError
 */
export class ServiceUnavailableError extends ServerError {
    /**
     * Creates a ServiceUnavailableError instance
     * @public
     *
     * @param {string} [message='Service Unavailable'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.SERVICE_UNAVAILABLE], { expose = false, props = {} } = {}) {
        super(status.SERVICE_UNAVAILABLE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.SERVICE_UNAVAILABLE;
    }
}

/**
 * Represents a 504 Gateway Timeout response
 * @extends ServerError
 */
export class GatewayTimeoutError extends ServerError {
    /**
     * Creates a GatewayTimeoutError instance
     * @public
     *
     * @param {string} [message='Gateway Timeout'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.GATEWAY_TIMEOUT], { expose = false, props = {} } = {}) {
        super(status.GATEWAY_TIMEOUT, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.GATEWAY_TIMEOUT;
    }
}

/**
 * Represents a 505 HTTP Version Not Supported response
 * @extends ServerError
 */
export class HttpVersionNotSupportedError extends ServerError {
    /**
     * Creates a HttpVersionNotSupportedError instance
     * @public
     *
     * @param {string} [message='HTTP Version Not Supported'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.HTTP_VERSION_NOT_SUPPORTED], { expose = false, props = {} } = {}) {
        super(status.HTTP_VERSION_NOT_SUPPORTED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.HTTP_VERSION_NOT_SUPPORTED;
    }
}

/**
 * Represents a 506 Variant Also Negotiates Error response
 * @extends ServerError
 */
export class VariantAlsoNegotiatesError extends ServerError {
    /**
     * Creates a VariantAlsoNegotiatesError instance
     * @public
     *
     * @param {string} [message='Variant Also Negotiates'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.VARIANT_ALSO_NEGOTIATES], { expose = false, props = {} } = {}) {
        super(status.VARIANT_ALSO_NEGOTIATES, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.VARIANT_ALSO_NEGOTIATES;
    }
}

/**
 * Represents a 507 Insufficient Storage response
 * @extends ServerError
 */
export class InsufficientStorageError extends ServerError {
    /**
     * Creates a InsufficientStorageError instance
     * @public
     *
     * @param {string} [message='Insufficient Storage'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.INSUFFICIENT_STORAGE], { expose = false, props = {} } = {}) {
        super(status.INSUFFICIENT_STORAGE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.INSUFFICIENT_STORAGE;
    }
}

/**
 * Represents a 508 Loop Detected response
 * @extends ServerError
 */
export class LoopDetectedError extends ServerError {
    /**
     * Creates a LoopDetectedError instance
     * @public
     *
     * @param {string} [message='Loop Detected'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.LOOP_DETECTED], { expose = false, props = {} } = {}) {
        super(status.LOOP_DETECTED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.LOOP_DETECTED;
    }
}

/**
 * Represents a 509 Bandwidth Limit Exceeded response
 * @extends ServerError
 */
export class BandwidthLimitExceededError extends ServerError {
    /**
     * Creates a BandwidthLimitExceededError instance
     * @public
     *
     * @param {string} [message='Bandwidth Limit Exceeded'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.BANDWIDTH_LIMIT_EXCEEDED], { expose = false, props = {} } = {}) {
        super(status.BANDWIDTH_LIMIT_EXCEEDED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.BANDWIDTH_LIMIT_EXCEEDED;
    }
}

/**
 * Represents a 510 Not Extended response
 * @extends ServerError
 */
export class NotExtendedError extends ServerError {
    /**
     * Creates a NotExtendedError instance
     * @public
     *
     * @param {string} [message='Not Extended'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.NOT_EXTENDED], { expose = false, props = {} } = {}) {
        super(status.NOT_EXTENDED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.NOT_EXTENDED;
    }
}

/**
 * Represents a 511 Network Authentication Required response
 * @extends ServerError
 */
export class NetworkAuthenticationRequiredError extends ServerError {
    /**
     * Creates a NetworkAuthenticationRequiredError instance
     * @public
     *
     * @param {string} [message='Network Authentication Required'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.NETWORK_AUTHENTICATION_REQUIRED], { expose = false, props = {} } = {}) {
        super(status.NETWORK_AUTHENTICATION_REQUIRED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.NETWORK_AUTHENTICATION_REQUIRED;
    }
}
