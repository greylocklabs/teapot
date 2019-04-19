import request from 'supertest';

import teapot from '../../src';
import app from '../fixtures/koa';
import { errorClassNames } from '../utils';

describe('koa server', () => {
  errorClassNames().forEach((className: string): void => {
    it('gets the correct set of codes and messages from each error', async () => {
      const { code } = teapot[className]();

      const res = await request(app).get(`/errors/${code}`);

      expect(res.status).toBe(code);
      expect(res.status).toBe(res.statusCode);
      expect(res.error.text).toBe(new teapot[className]().message);
    });
  });
});
