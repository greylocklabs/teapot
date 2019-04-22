import status from '../status';

class HTTPError extends Error {
  name: string;

  code: number;

  status: number;

  expose: boolean;

  data?: any;

  reservedKeys: string[] = [ 'expose', 'status', 'statusCode', 'name', 'message' ];

  constructor(code: number, message: string, options: ErrorOptions = { expose: false }) {
    super(message);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.code = code;
    this.status = code;
    this.expose = options.expose;

    if (!status.isError(code)) throw new Error(`Invalid status code ${code} = must be 4xx or 5xx`);

    if (options.data) this.data = options.data;
  }
}

export interface ErrorOptions {
  expose: boolean;
  data?: any;
}

export default HTTPError;
