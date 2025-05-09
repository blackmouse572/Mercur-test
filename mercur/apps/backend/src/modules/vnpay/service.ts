import { AbstractPaymentProvider, MedusaError } from '@medusajs/framework/utils'
import { CapturePaymentInput, CapturePaymentOutput, AuthorizePaymentOutput, CancelPaymentInput, CancelPaymentOutput, InitiatePaymentInput, InitiatePaymentOutput, DeletePaymentOutput, GetPaymentStatusInput, GetPaymentStatusOutput, RefundPaymentInput, RefundPaymentOutput, RetrievePaymentInput, RetrievePaymentOutput, UpdatePaymentInput, UpdatePaymentOutput, ProviderWebhookPayload, WebhookActionResult, AuthorizePaymentInput } from '@medusajs/types'
import { VNPay, VNPayConfig, VnpCurrCode } from 'vnpay'
type VNPayOption = Pick<VNPayConfig, 'tmnCode' | 'secureSecret' | 'vnpayHost'> & {
    returnUrl: string
}
type InjectedDependencies = {
    cartService: AdminCartService
}

class VNPayProviderService extends AbstractPaymentProvider<VNPayOption> {
    static readonly identifier = 'vnpay-payment'
    protected client: VNPay
    protected options_: VNPayOption

    constructor(container, options: VNPayOption) {
        super(container, options)
        this.validateModuleOptions(options)
        this.client = new VNPay(options)
        this.options_ = options
    }

    validateModuleOptions(options) {
        for (const key in options) {
            if (!options[key]) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `No ${key} was provided in the ${VNPayProviderService.identifier} options. Please add one.`
                )
            }
        }
    }

    async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
        console.log("[VNPay] capturePayment", input)
        return {}
    }
    async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
        console.log("[VNPay] authorizePayment", input)

        if (!input.data) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                `VNPay: No data was provided in the request.`
            )
        }
        const { amount, currency_code, sessionId } = input.data as {
            amount: number
            currency_code: string
            sessionId: string
        }
        const { card_id } = input.context as Record<string, any>

        // const order_id = 
        const orderInfor = `Payment for order ${card_id}`

        const paymentUrl = this.client.buildPaymentUrl({
            vnp_Amount: amount,
            vnp_CurrCode: VnpCurrCode.VND,
            vnp_IpAddr: '127.0.0.1',
            vnp_OrderInfo: orderInfor,
            vnp_ReturnUrl: this.options_.returnUrl,
            vnp_TxnRef: card_id,
        })
        return {
            status: 'authorized',
            data: {
                paymentUrl,
            }
        }
    }
    async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
        console.log("[VNPay] cancelPayment", input)
        return {
        }
    }
    async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
        console.log("[VNPay] initiatePayment", input)
        const id = input.data?.id as string ?? `order_${Date.now()}`
        const response: InitiatePaymentOutput = {
            id,
            data: {
                amount: input.amount,
                currency_code: input.currency_code,
                sessionId: input.data?.session_id
            }
        }

        return response;
    }
    async deletePayment(): Promise<DeletePaymentOutput> {
        console.log("[VNPay] deletePayment")
        return {}
    }
    async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
        console.log("[VNPay] getPaymentStatus", input)
        return {
            status: 'authorized',
        }
    }
    async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
        console.log("[VNPay] refundPayment", input)
        return {}
    }
    async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
        console.log("[VNPay] retrievePayment", input)
        return {}
    }
    async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
        console.log("[VNPay] updatePayment", input)
        return {}
    }
    async getWebhookActionAndData(data: ProviderWebhookPayload['payload']): Promise<WebhookActionResult> {
        console.log("[VNPay] getWebhookActionAndData", data)
        const { isSuccess, isVerified, vnp_Amount, vnp_TxnRef } = this.client.verifyIpnCall(data.data as any)
        if (!isVerified) {
            return {
                action: 'requires_more',
            }
        }
        if (!isSuccess) {
            return {
                action: 'authorized',
                data: {
                    amount: vnp_Amount,
                    session_id: vnp_TxnRef,
                }
            }
        }

        return {
            action: 'captured',
            data: {
                amount: vnp_Amount,
                session_id: vnp_TxnRef,
            }
        }

    }
}

export default VNPayProviderService