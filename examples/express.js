import express from 'express';

import { errors, status } from '../src';

const app = express();

app.get('/api', (req, res) => {
    res.status(status.OK).json({
        api: 'running',
    });
});

app.get('/404', (req, res, next) => next(new errors.NotFoundError('Nothing to see here!')));
app.get('/500', (req, res, next) => next(new errors.InternalServerError('Something broke!')));

app.listen(3000);
