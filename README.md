# Teapot

> Utilities for working with HTTP status codes, errors, and more.

[![npm version](https://badge.fury.io/js/node-teapot.svg)](https://badge.fury.io/js/node-teapot)
[![build status](https://travis-ci.org/greylocklabs/teapot.svg?branch=master)](https://travis-ci.org/greylocklabs/teapot)
[![coverage status](https://coveralls.io/repos/github/greylocklabs/teapot/badge.svg?branch=master)](https://coveralls.io/github/greylocklabs/teapot?branch=master)

---

Teapot is an HTTP utility library for JavaScript, which leverages the
[Node.js HTTP library](https://nodejs.org/api/http.html). It provides the following:

1. The ability to get an HTTP status code: `teapot.status(404)` and `teapot.status('not found')` would both
   return `404`.
2. Useful error classes to represent HTTP error codes:
    - `HTTPError`: Base class to represent an HTTP error
    - `ClientError` and `ServerError`: Classes to represent 4xx and 5xx errors
    - Classes for every unique HTTP error status code, ranging from `NotImplementedError` to `PaymentRequiredError`
3. A function to generate one of the HTTP error classes from a status code: `teapot.error(404)` would return an
   instance of `NotFoundError`. Great when handling responses from third-party APIs, when you might not know what
   status codes to expect all the time.

TypeScript definitions are included as well.

## Installation

With `yarn`:

```bash
$ yarn add node-teapot
```

With `npm`:

```bash
$ npm install node-teapot
```

## Usage

### Get a status code

There are a variety of ways to get a status code from a number or string message:

```js
teapot.status.code(404); // 404
teapot.status.code('not implemented'); // 405

teapot.status.codes['BAD GATEWAY']; // 502

teapot.status.MOVED_PERMANENTLY; // 301
```

### Get a canned status message

```js
teapot.status[200]; // "OK"
```

### Create an HTTP error

Teapot's errors are compatible with Koa and Express:

```js
throw new teapot.InternalServerError('Oops! Something went wrong.');
```

### Generate an error from a status code

```js
teapot.error(500) // returns instance of InternalServerError
teapot.error(204) // throws error because 204 is not an error code

teapot.error(404, 'My custom message', { // custom message w/ misc. additional properties
   expose: true,
   data: {
      misc: 'blah',
   },
})
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License. See [LICENSE](LICENSE) file for details.
