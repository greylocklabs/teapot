# @greylocklabs/http

> Utilities for working with HTTP status codes, errors, and more

[![npm version](https://badge.fury.io/js/%40greylocklabs%2Fhttp.svg)](https://badge.fury.io/js/%40greylocklabs%2Fhttp)
[![Build Status](https://travis-ci.org/greylocklabs/http.svg?branch=master)](https://travis-ci.org/greylocklabs/http)
[![Coverage Status](https://coveralls.io/repos/github/greylocklabs/http/badge.svg?branch=master)](https://coveralls.io/github/greylocklabs/http?branch=master)

---

This package provides a series of useful Node.js modules meant for use in web servers. The following utilities are
included:

1. [`status`](src/status) - HTTP status code utilities
2. [`errors`](src/errors) - Custom HTTP errors for use in Koa, Express, etc.
    - [Client](src/errors/client/index.js)
    - [Server](src/errors/server/index.js)
3. [`createError` function](src/index.js) - Create an HTTP error from a status code

Additionally, a `createError(statusCode, message)` function is provided so you can easily create the
correct `ClientError` or `ServerError` from an HTTP status code. Useful in cases where you're interacting
with a third-party API and might not know what status codes to expect. See below for examples.

## Installation

Install using `npm`:

```bash
$ npm install @greylocklabs/http
```

## Usage

Here's a basic web server using the [Koa](http://koajs.com) framework as an example:

```js
import Koa from 'koa';
import Router from 'koa-router';

import { createError, errors, status } from '../src';

const app = new Koa();
const router = new Router();

router.get('/api', async (ctx, next) => {
    await next();

    ctx.status = status.OK; // 200
    ctx.message = status[200]; // 'OK'
    ctx.body = {
        api: 'running',
    };
});

router.get('/errors/404', () => {
    throw new errors.NotFoundError('Nothing to see here!'); // error exposed to client by default
});

router.get('/errors/500', () => {
    throw new errors.InternalServerError('Something broke!'); // only shows "Internal Server Error" publicly
});

router.get('/custom/:code', (ctx) => {
    throw createError(ctx.params.code); // throws the error that corresponds to the status code provided
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('App is listening on port 3000...');
});
```

More examples can be found [here](examples)!

## Documentation

The documentation can be viewed [here](https://doclets.io/greylocklabs/http/master).

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.

## License

MIT License. See LICENSE file for details.
