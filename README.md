# Teapot

> Utilities for working with HTTP status codes, errors, and more

[![npm version](https://badge.fury.io/js/%40greylocklabs%2Fteapot.svg)](https://badge.fury.io/js/%40greylocklabs%2Fteapot)
[![Build Status](https://travis-ci.org/greylocklabs/teapot.svg?branch=master)](https://travis-ci.org/greylocklabs/teapot)
[![Coverage Status](https://coveralls.io/repos/github/greylocklabs/teapot/badge.svg?branch=master)](https://coveralls.io/github/greylocklabs/teapot?branch=master)

---

Teapot is an HTTP utility library for Node. It provides the following:

1. The ability to get an HTTP status code: `teapot.status(404)` and `teapot.status('not found')` would both
   return `404`.
2. Useful error classes to represent HTTP error codes:
    - `HTTPError`: Base class to represent an HTTP error
    - `ClientError` and `ServerError`: Classes to represent 4xx and 5xx errors
    - Classes for every unique HTTP error status code, ranging from `NotImplementedError` to `PaymentRequiredError`
3. A function to generate one of the HTTP error classes from a status code: `teapot.error(404)` would return an
   instance of `NotFoundError`. Great when handling responses from third-party APIs, when you might not know what
   status codes to expect all the time.

## Installation

Install using `npm` (requires Node.js 7+ to work):

```bash
$ npm install node-teapot
```

## Usage

Here's a basic web server using the [Koa](http://koajs.com) framework, which illustrates what you can do with this
library:

```js
import Koa from 'koa';
import Router from 'koa-router';

import teapot from '../src';

const app = new Koa();
const router = new Router();

const statusCodes = teapot.status.codes; // all of the status codes

router.get('/health-check', async (ctx, next) => {
    await next();

    ctx.status = teapot.status.OK; // 200
    ctx.body = {
        status: 'good',
        message: teapot.status[200], // 'OK'
    };
});

router.get('/errors/404', () => {
    throw new teapot.NotFoundError('Nothing to see here!'); // 404
});

router.get('/errors/500', () => {
    throw new teapot.InternalServerError('Something broke!'); // 500; Koa will only show message in console
});

router.get('/errors/random', () => {
    const errorCodes = statusCodes.filter((c) => /4|5/.test(c.toString().charAt(0)));
    const code = errorCodes[Math.floor(Math.random() * errorCodes.length)];

    throw teapot.error(code); // Will have correct status code and default error message for code
});

router.get('/teapot', async (ctx, next) => {
    await next();

    const err = new teapot.ImATeapotError('Custom error message');

    ctx.status = teapot.status.IM_A_TEAPOT;
    ctx.body = {
        error: err.name,
        message: err.message,
        stack: err.stack,
    };
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('App is listening on port 3000...');
});
```

More examples can be found [here](examples)!

## Documentation

The documentation can be viewed [here](https://doclets.io/greylocklabs/teapot/master).

## Testing

This library has an extensive test suite, and code coverage is always at 100%. Run the tests as follows:

```bash
$ npm test
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.

## License

MIT License. See LICENSE file for details.
