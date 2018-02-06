import express from 'express';

import teapot from '../src';

const app = express();

app.get('/api', (req, res) => {
    res.status(teapot.status.OK).json({
        api: 'running',
    });
});

app.get('/errors/404', (req, res, next) => next(new teapot.NotFoundError('Nothing to see here!')));
app.get('/errors/500', (req, res, next) => next(new teapot.InternalServerError('Something broke!')));
app.get('/custom/:code', (req, res, next) => next(teapot.error(req.params.code)));

app.listen(3000, () => {
    console.log('App listening on port 3000...'); // eslint-disable-line no-console
});
