import express, { Request, Response } from 'express';

import teapot from '../../src';

const app = express();

app.get('/errors/:code', (req: Request, res: Response): void => {
  throw teapot.error(req.params.code);
});

export default app;
