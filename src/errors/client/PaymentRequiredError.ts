import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class PaymentRequiredError extends ClientError {
  constructor(message: string = status.codes[status.PAYMENT_REQUIRED], options: ErrorOptions = { expose: true }) {
    super(status.PAYMENT_REQUIRED, message, options);
  }
}

export default PaymentRequiredError;
