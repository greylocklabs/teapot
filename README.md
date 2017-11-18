# HTTP

Utilities for working with HTTP status codes, errors, and more

[![Build Status](https://travis-ci.org/greylocklabs/http.svg?branch=master)](https://travis-ci.org/greylocklabs/http)
[![Coverage Status](https://coveralls.io/repos/github/greylocklabs/http/badge.svg?branch=master)](https://coveralls.io/github/greylocklabs/http?branch=master)

---

This package provides a series of useful Node.js modules meant for use in web servers. The following libraries are
included:

1. [`status`](src/status) - HTTP status code utilities
2. [`errors`](src/errors) - Custom HTTP errors for use in Koa, Express, etc.

## Installation

Install using `npm`:

```sh
$ npm install --save @greylocklabs/http
```

## Usage

Here's a basic web server using the [Koa](http://koajs.com) framework as an example:

```js
import Koa from 'koa';
import Router from 'koa-router';

import { errors, status } from '@greylocklabs/http';

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

router.get('/404', () => {
    throw new errors.NotFoundError('Nothing to see here!');
});

router.get('/500', () => {
    throw new errors.InternalServerError('Something broke!');
});

app.use(router.routes());

app.listen(3000);
```

More examples can be found [here](examples)!

## Documentation

The documentation can be viewed [here](https://doclets.io/greylocklabs/http/master).

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.

## License

MIT License

Copyright (c) 2017 Greylock Labs.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
