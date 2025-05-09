import StripeConnectProvider from '../core/stripe-connect-provider'
import { PaymentIntentOptions, PaymentProviderKeys } from '../types'

class StripeConnectCardProviderService extends StripeConnectProvider {
  static readonly identifier = PaymentProviderKeys.CARD

  constructor(_, options) {
    super(_, options)
  }

  get paymentIntentOptions(): PaymentIntentOptions {
    return {
      payment_method_types: ['card']
    }
  }
}

export default StripeConnectCardProviderService
