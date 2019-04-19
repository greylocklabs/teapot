import http from 'http';

import teapot from '../../src';

describe('teapot.status', () => {
  it('provides the correct status code on the status.codes object', () => {
    Object.values(http.STATUS_CODES).forEach((msg: string): void => {
      const key = msg
        .replace(/\s|-/gu, '_')
        .replace('\'', '')
        .toUpperCase();

      expect(Number.isInteger(teapot.status[key])).toBe(true);
    });
  });

  it('contains the http.STATUS_CODES object from the Node.js standard library', () => {
    expect(teapot.status.STATUS_CODES).toStrictEqual(http.STATUS_CODES);
  });

  describe('invalid status codes', () => {
    const codes = [ 600, '108', 'Hello', 'Not foundd', 33 ];

    for (const invalidCode of codes) {
      it('throws an error when the code() method is not provided a valid status code', () => {
        const fn = (): void => {
          teapot.status.code(invalidCode);
        };

        expect(fn).toThrow(/Invalid status (code|message) */u);
      });
    }
  });
});
