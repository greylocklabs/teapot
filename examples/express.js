import express from 'express';

import { createError, errors, status } from '../src';

const app = express();

app.get('/api', (req, res) => {
    res.status(status.OK).json({
        api: 'running',
    });
});

app.get('/errors/404', (req, res, next) => next(new errors.NotFoundError('Nothing to see here!')));
app.get('/errors/500', (req, res, next) => next(new errors.InternalServerError('Something broke!')));
app.get('/custom/:code', (req, res, next) => next(createError(req.params.code)));

app.listen(3000);
