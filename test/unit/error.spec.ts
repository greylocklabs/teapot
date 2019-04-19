import teapot from '../../src';
import { randomErrorCode } from '../utils';

describe('teapot.error', () => {
  let errorCode: number;

  beforeEach(() => {
    errorCode = randomErrorCode();
  });

  it('creates an error from a status code', () => {
    const err = teapot.error(errorCode);

    expect(err.code).toBe(errorCode);
    expect(err.status).toBe(errorCode);
    expect(err.message).toBe(teapot.status.codes[errorCode]);
  });

  it('creates an error with a custom message', () => {
    const err = teapot.error(errorCode, 'Oops');

    expect(err.message).toBe('Oops');
  });

  it('creates the correct HTTPError subclass (ClientError or ServerError) for all valid status codes', () => {
    let err;

    teapot.status.statusCodes.forEach((code: number): void => {
      if (teapot.status.isError(code)) {
        err = teapot.error(code);

        if (code.toString().charAt(0) === '4') {
          expect(err.expose).toBe(true);
        } else {
          expect(err.expose).toBe(false);
        }
      }
    });
  });
});
