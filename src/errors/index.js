/**
 * @file HTTP error classes
 * @module errors
 *
 * @author Ty-Lucas Kelley <ty@greylocklabs.com> (https://greylocklabs.com)
 * @copyright Copyright (c) 2017-2018 Greylock Labs. See LICENSE file.
 */

import status from '../status';

/** Base HTTP error classes */

/**
 * Represents a 4xx or 5xx HTTP status code
 * @extends Error
 */
export class HTTPError extends Error {
    /**
     * Creates an instance of HTTPError
     * @public
     *
     * @param {string|number} code - HTTP status code
     * @param {string} message - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Flag used by Koa to decide whether or not to expose error
     * @param {Object} [properties.props={}] - Custom properties
     *
     * @throws {Error} If status code is not 4xx or 5xx
     */
    constructor(code, message, { expose = false, props = {} } = {}) {
        super(message);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.expose = expose; // for koa

        if (!status.error(code)) {
            throw new Error(`Invalid status code ${code} - must be 4xx or 5xx`);
        }

        this.status = code;
        this.statusCode = this.status; // for compatibility

        for (const key in props) {
            if (![ 'expose', 'status', 'statusCode', 'name', 'message' ].includes(key)) {
                this[key] = props[key];
            }
        }
    }
}

/**
 * Represents a 4xx HTTP status code
 * @extends HTTPError
 */
export class ClientError extends HTTPError {
    /**
     * Creates an instance of ClientError
     * @public
     *
     * @param {string|number} code - HTTP status code
     * @param {string} message - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Flag used by Koa to decide whether or not to expose error
     * @param {Object} [properties.props={}] - Custom properties
     *
     * @throws {Error} If status code is not 4xx
     */
    constructor(code, message, { expose = true, props = {} } = {}) {
        super(code, message, { expose, props });

        if (!status.clientError(code)) {
            throw new Error(`Invalid status code ${code} - must be `);
        }
    }
}

/**
 * Represents a 5xx HTTP status code
 * @extends HTTPError
 */
export class ServerError extends HTTPError {
    /**
     * Creates an instance of ServerError
     * @public
     *
     * @param {string|number} code - HTTP status code
     * @param {string} message - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=false] - Flag used by Koa to decide whether or not to expose error
     * @param {Object} [properties.props={}] - Custom properties
     *
     * @throws {Error} If status code is not 5xx
     */
    constructor(code, message, { expose = false, props = {} } = {}) {
        super(code, message, { expose, props });

        if (!status.serverError(code)) {
            throw new Error(`Invalid status code ${code} - must be `);
        }
    }
}

/** Client errors */

/**
 * Represents a 400 Bad Request response
 * @extends ClientError
 */
export class BadRequestError extends ClientError {
    /**
     * Creates a BadRequestError instance
     * @public
     *
     * @param {string} [message='Bad Request'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.BAD_REQUEST], { expose = true, props = {} } = {}) {
        super(status.BAD_REQUEST, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.BAD_REQUEST;
    }
}

/**
 * Represents a 401 Unauthorized response
 * @extends ClientError
 */
export class UnauthorizedError extends ClientError {
    /**
     * Creates an UnauthorizedError instance
     * @public
     *
     * @param {string} [message='Unauthorized'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.UNAUTHORIZED], { expose = true, props = {} } = {}) {
        super(status.UNAUTHORIZED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.UNAUTHORIZED;
    }
}

/**
 * Represents a 402 Payment Required response
 * @extends ClientError
 */
export class PaymentRequiredError extends ClientError {
    /**
     * Creates a PaymentRequiredError instance
     * @public
     *
     * @param {string} [message='Payment Required'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.PAYMENT_REQUIRED], { expose = true, props = {} } = {}) {
        super(status.PAYMENT_REQUIRED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.PAYMENT_REQUIRED;
    }
}

/**
 * Represents a 403 Forbidden response
 * @extends ClientError
 */
export class ForbiddenError extends ClientError {
    /**
     * Creates a ForbiddenError instance
     * @public
     *
     * @param {string} [message='Forbidden'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.FORBIDDEN], { expose = true, props = {} } = {}) {
        super(status.FORBIDDEN, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.FORBIDDEN;
    }
}

/**
 * Represents a 404 Not Found response
 * @extends ClientError
 */
export class NotFoundError extends ClientError {
    /**
     * Creates a NotFoundError instance
     * @public
     *
     * @param {string} [message='Not Found'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.NOT_FOUND], { expose = true, props = {} } = {}) {
        super(status.NOT_FOUND, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.NOT_FOUND;
    }
}

/**
 * Represents a 405 Method Not Allowed response
 * @extends ClientError
 */
export class MethodNotAllowedError extends ClientError {
    /**
     * Creates a MethodNotAllowedError instance
     * @public
     *
     * @param {string} [message='Method Not Allowed'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.METHOD_NOT_ALLOWED], { expose = true, props = {} } = {}) {
        super(status.METHOD_NOT_ALLOWED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.METHOD_NOT_ALLOWED;
    }
}

/**
 * Represents a 406 Not Acceptable response
 * @extends ClientError
 */
export class NotAcceptableError extends ClientError {
    /**
     * Creates a NotAcceptableError instance
     * @public
     *
     * @param {string} [message='Not Acceptable'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.NOT_ACCEPTABLE], { expose = true, props = {} } = {}) {
        super(status.NOT_ACCEPTABLE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.NOT_ACCEPTABLE;
    }
}

/**
 * Represents a 407 Proxy Authentication Required response
 * @extends ClientError
 */
export class ProxyAuthenticationRequiredError extends ClientError {
    /**
     * Creates a ProxyAuthenticationRequiredError instance
     * @public
     *
     * @param {string} [message='Proxy Authentication Required'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.PROXY_AUTHENTICATION_REQUIRED], { expose = true, props = {} } = {}) {
        super(status.PROXY_AUTHENTICATION_REQUIRED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.PROXY_AUTHENTICATION_REQUIRED;
    }
}

/**
 * Represents a 408 Request Timeout response
 * @extends ClientError
 */
export class RequestTimeoutError extends ClientError {
    /**
     * Creates a RequestTimeoutError instance
     * @public
     *
     * @param {string} [message='Request Timeout'] Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.REQUEST_TIMEOUT], { expose = true, props = {} } = {}) {
        super(status.REQUEST_TIMEOUT, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.REQUEST_TIMEOUT;
    }
}

/**
 * Represents a 409 Conflict response
 * @extends ClientError
 */
export class ConflictError extends ClientError {
    /**
     * Creates a ConflictError instance
     * @public
     *
     * @param {string} [message='Conflict'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.CONFLICT], { expose = true, props = {} } = {}) {
        super(status.CONFLICT, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.CONFLICT;
    }
}

/**
 * Represents a 410 Gone response
 * @extends ClientError
 */
export class GoneError extends ClientError {
    /**
     * Creates a GoneError instance
     * @public
     *
     * @param {string} [message='Gone'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.GONE], { expose = true, props = {} } = {}) {
        super(status.GONE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.GONE;
    }
}

/**
 * Represents a 411 Length Required response
 * @extends ClientError
 */
export class LengthRequiredError extends ClientError {
    /**
     * Creates a LengthRequiredError instance
     * @public
     *
     * @param {string} [message='Length Required'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.LENGTH_REQUIRED], { expose = true, props = {} } = {}) {
        super(status.LENGTH_REQUIRED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.LENGTH_REQUIRED;
    }
}

/**
 * Represents a 412 Precondition Failed response
 * @extends ClientError
 */
export class PreconditionFailedError extends ClientError {
    /**
     * Creates a PreconditionFailedError instance
     * @public
     *
     * @param {string} [message='Precondition Failed'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.PRECONDITION_FAILED], { expose = true, props = {} } = {}) {
        super(status.PRECONDITION_FAILED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.PRECONDITION_FAILED;
    }
}

/**
 * Represents a 413 Payload Too Large response
 * @extends ClientError
 */
export class PayloadTooLargeError extends ClientError {
    /**
     * Creates a PayloadTooLargeError instance
     * @public
     *
     * @param {string} [message='Payload Too Large'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.PAYLOAD_TOO_LARGE], { expose = true, props = {} } = {}) {
        super(status.PAYLOAD_TOO_LARGE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.PAYLOAD_TOO_LARGE;
    }
}

/**
 * Represents a 414 URI Too Long response
 * @extends ClientError
 */
export class UriTooLongError extends ClientError {
    /**
     * Creates a UriTooLongError instance
     * @public
     *
     * @param {string} [message='URI Too Long'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.URI_TOO_LONG], { expose = true, props = {} } = {}) {
        super(status.URI_TOO_LONG, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.URI_TOO_LONG;
    }
}

/**
 * Represents a 415 Unsupported Media Type response
 * @extends ClientError
 */
export class UnsupportedMediaTypeError extends ClientError {
    /**
     * Creates an UnsupportedMediaTypeError instance
     * @public
     *
     * @param {string} [message='Unsupported Media Type'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.UNSUPPORTED_MEDIA_TYPE], { expose = true, props = {} } = {}) {
        super(status.UNSUPPORTED_MEDIA_TYPE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.UNSUPPORTED_MEDIA_TYPE;
    }
}

/**
 * Represents a 416 Range Not Satisfiable response
 * @extends ClientError
 */
export class RangeNotSatisfiableError extends ClientError {
    /**
     * Creates a RangeNotSatisfiableError instance
     * @public
     *
     * @param {string} [message='Range Not Satisfiable'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.RANGE_NOT_SATISFIABLE], { expose = true, props = {} } = {}) {
        super(status.RANGE_NOT_SATISFIABLE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.RANGE_NOT_SATISFIABLE;
    }
}

/**
 * Represents a 417 Expectation Failed response
 * @extends ClientError
 */
export class ExpectationFailedError extends ClientError {
    /**
     * Creates an ExpectationFailedError instance
     * @public
     *
     * @param {string} [message='Expectation Failed'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.EXPECTATION_FAILED], { expose = true, props = {} } = {}) {
        super(status.EXPECTATION_FAILED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.EXPECTATION_FAILED;
    }
}

/**
 * Represents a 418 I'm a Teapot response
 * @extends ClientError
 */
export class ImATeapotError extends ClientError {
    /**
     * Creates an ImATeapotError instance
     * @public
     *
     * @param {string} [message="I'm a Teapot"] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.IM_A_TEAPOT], { expose = true, props = {} } = {}) {
        super(status.IM_A_TEAPOT, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.IM_A_TEAPOT;
    }
}

/**
 * Represents a 421 Misdirected Request response
 * @extends ClientError
 */
export class MisdirectedRequestError extends ClientError {
    /**
     * Creates a MisdirectedRequestError instance
     * @public
     *
     * @param {string} [message='Misdirected Request'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.MISDIRECTED_REQUEST], { expose = true, props = {} } = {}) {
        super(status.MISDIRECTED_REQUEST, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.MISDIRECTED_REQUEST;
    }
}

/**
 * Represents a 422 Unprocessable Entity response
 * @extends ClientError
 */
export class UnprocessableEntityError extends ClientError {
    /**
     * Creates an UnprocessableEntityError instance
     * @public
     *
     * @param {string} [message='Unprocessable Entity'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.UNPROCESSABLE_ENTITY], { expose = true, props = {} } = {}) {
        super(status.UNPROCESSABLE_ENTITY, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.UNPROCESSABLE_ENTITY;
    }
}

/**
 * Represents a 423 Locked response
 * @extends ClientError
 */
export class LockedError extends ClientError {
    /**
     * Creates a LockedError instance
     * @public
     *
     * @param {string} [message='Locked'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.LOCKED], { expose = true, props = {} } = {}) {
        super(status.LOCKED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.LOCKED;
    }
}

/**
 * Represents a 424 Failed Dependency response
 * @extends ClientError
 */
export class FailedDependencyError extends ClientError {
    /**
     * Creates a FailedDependencyError instance
     * @public
     *
     * @param {string} [message='Failed Dependency'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.FAILED_DEPENDENCY], { expose = true, props = {} } = {}) {
        super(status.FAILED_DEPENDENCY, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.FAILED_DEPENDENCY;
    }
}

/**
 * Represents a 425 Unordered Collection response
 * @extends ClientError
 */
export class UnorderedCollectionError extends ClientError {
    /**
     * Creates an UnorderedCollectionError instance
     * @public
     *
     * @param {string} [message='Unordered Collection'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.UNORDERED_COLLECTION], { expose = true, props = {} } = {}) {
        super(status.UNORDERED_COLLECTION, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.UNORDERED_COLLECTION;
    }
}

/**
 * Represents a 426 Upgrade Required response
 * @extends ClientError
 */
export class UpgradeRequiredError extends ClientError {
    /**
     * Creates an UpgradeRequiredError instance
     * @public
     *
     * @param {string} [message='Upgrade Required'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.UPGRADE_REQUIRED], { expose = true, props = {} } = {}) {
        super(status.UPGRADE_REQUIRED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.UPGRADE_REQUIRED;
    }
}

/**
 * Represents a 428 Precondition Required response
 * @extends ClientError
 */
export class PreconditionRequiredError extends ClientError {
    /**
     * Creates a PreconditionRequiredError instance
     * @public
     *
     * @param {string} [message='Precondition Required'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.PRECONDITION_REQUIRED], { expose = true, props = {} } = {}) {
        super(status.PRECONDITION_REQUIRED, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.PRECONDITION_REQUIRED;
    }
}

/**
 * Represents a 429 Too Many Requests response
 * @extends ClientError
 */
export class TooManyRequestsError extends ClientError {
    /**
     * Creates a TooManyRequestsError instance
     * @public
     *
     * @param {string} [message='Too Many Requests'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.TOO_MANY_REQUESTS], { expose = true, props = {} } = {}) {
        super(status.TOO_MANY_REQUESTS, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.TOO_MANY_REQUESTS;
    }
}

/**
 * Represents a 431 Request Header Fields Too Large response
 * @extends ClientError
 */
export class RequestHeaderFieldsTooLargeError extends ClientError {
    /**
     * Creates a RequestHeaderFieldsTooLargeError instance
     * @public
     *
     * @param {string} [message='Request Header Fields Too Large'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.REQUEST_HEADER_FIELDS_TOO_LARGE], { expose = true, props = {} } = {}) {
        super(status.REQUEST_HEADER_FIELDS_TOO_LARGE, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.REQUEST_HEADER_FIELDS_TOO_LARGE;
    }
}

/**
 * Represents a 451 Unavailable For Legal Reasons response
 * @extends ClientError
 */
export class UnavailableForLegalReasonsError extends ClientError {
    /**
     * Creates a UnavailableForLegalReasonsError instance
     * @public
     *
     * @param {string} [message='Unavailable For Legal Reasons'] - Error message
     * @param {Object} [properties] - Extra error properties to add
     * @param {boolean} [properties.expose=true] - Whether or not to expose error message to the client
     * @param {Object} [properties.props={}] - Custom properties to add to error object
     */
    constructor(message = status[status.UNAVAILABLE_FOR_LEGAL_REASONS], { expose = true, props = {} } = {}) {
        super(status.UNAVAILABLE_FOR_LEGAL_REASONS, message, { expose, props });
    }

    /**
     * Returns status code associated with Error object
     * @public
     *
     * @returns {number} HTTP status code
     */
    static code() {
        return status.UNAVAILABLE_FOR_LEGAL_REASONS;
    }
}

/** Server errors */

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
