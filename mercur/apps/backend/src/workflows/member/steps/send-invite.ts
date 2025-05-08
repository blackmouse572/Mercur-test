
import { Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MemberInviteDTO } from '../../../modules/seller/types'
import { CreateNotificationDTO } from "@medusajs/framework/types"
import { ResendNotificationTemplates } from "#/modules/resend/types/templates"

export const sendInviteMember = createStep(
    'send-invite-email',
    async function (input: MemberInviteDTO, { container }) {
        const notificationModuleService = container.resolve(
            Modules.NOTIFICATION
        )
        const payload: CreateNotificationDTO = {
            channel: 'email',
            to: input.email,
            template: ResendNotificationTemplates.INVITE_MEMBER,
            data: input
        }
        try {
            const notification = await notificationModuleService.createNotifications(payload)
            return new StepResponse(notification)
        } catch (error) {
            console.error("Error sending invite email", error)
            console.debug("URI:", `/invites?token=${input.token}`)
            return new StepResponse()
        }
    }
)
