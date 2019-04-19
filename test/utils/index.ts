import http from 'http';

import teapot from '../../src';

export const statusCodes = Object.keys(http.STATUS_CODES).map(Number);

export const randomErrorCode = (type?: 'client' | 'server'): number => {
  let pattern: RegExp;

  switch (type) {
    case 'server':
      pattern = /5/u;
      break;
    case 'client':
      pattern = /4/u;
      break;
    default:
      pattern = /4|5/u;
  }

  const codes = statusCodes.filter((c: number) => pattern.test(c.toString().charAt(0)));

  return codes[Math.floor(Math.random() * codes.length)];
};

export const errorClassNames = (): string[] => {
  const formatted = Object.values(http.STATUS_CODES).map((msg: string) => msg.replace(/\s|-|'/gu, ''));
  const names = [];

  for (let f of formatted) {
    if (f === 'ImaTeapot') f = 'ImATeapot';
    if (!(f.slice(-5) === 'Error')) f = `${f}Error`;

    if (teapot[f]) names.push(f);
  }

  return names;
};
