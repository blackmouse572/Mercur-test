import { Resend } from 'resend'

import {
  AbstractNotificationProviderService,
  MedusaError
} from '@medusajs/framework/utils'
import { ProviderSendNotificationDTO } from '@medusajs/types'

import { emailTemplates } from './email-templates'
import { ResendNotificationTemplates } from './types/templates'

type ResendOptions = {
  api_key: string
  from: string
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = 'resend-notification'
  private resendClient: Resend
  private options: ResendOptions

  constructor(_, options: ResendOptions) {
    super()
    this.validateModuleOptions(options)
    this.resendClient = new Resend(options.api_key)
    this.options = options
  }

  validateModuleOptions(options: ResendOptions) {
    console.log("validating options", options)
    for (const key in options) {
      if (!options[key]) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `No ${key} was provided in the ${ResendNotificationProviderService.identifier} options. Please add one.`
        )
      }
    }
  }

  getTemplate(template: ResendNotificationTemplates) {
    const allowedTemplates = Object.values(ResendNotificationTemplates)

    if (!allowedTemplates.includes(template)) {
      return null
    }

    return emailTemplates[template]
  }

  getTemplateSubject(template: ResendNotificationTemplates) {
    switch (template) {
      case ResendNotificationTemplates.SELLER_NEW_ORDER:
        return "New Order"
      case ResendNotificationTemplates.INVITE_MEMBER:
        return "You have been invited to join a team"
      default:
        return "New Email"
    }
  }

  async send(notification: ProviderSendNotificationDTO) {
    console.log("\n--------Starting to send email-----------")
    console.log("Sending email with Resend", notification)
    const template = this.getTemplate(notification.template as ResendNotificationTemplates)
    if (!template) {
      console.error(
        `[ERROR] Template ${notification.template} is not supported`
      )
      return {}
    }
    const { data, error } = await this.resendClient.emails.send({
      from: notification.from?.trim() || this.options.from,
      to: notification.to,
      subject: this.getTemplateSubject(notification.template as ResendNotificationTemplates),
      react: template(notification.data || {}),
    }).catch((error) => {
      console.error("[ERROR] error sending email", error)
      return { data: null, error }
    })

    if (error) {
      console.error(`[ERROR] error ${error.name}: ${error.message}`)
      console.log("-------End of email sending-------\n")
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, error.message)
    }

    if (!data) {
      console.error("No data returned by resend client")
      console.log("-------End of email sending-------\n")
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        'No data returned by resend client'
      )
    }
    console.log("Email sent successfully", data)
    console.log("-------End of email sending-------\n")
    return data
  }
}

export default ResendNotificationProviderService
