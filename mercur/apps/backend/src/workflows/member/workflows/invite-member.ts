import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

import { CreateMemberInviteDTO } from '../../../modules/seller/types'
import { createMemberInviteStep } from '../steps'
import { sendInviteMember } from '../steps/send-invite'

export const inviteMemberWorkflow = createWorkflow(
  'invite-member',
  function (input: CreateMemberInviteDTO) {
    const member = createMemberInviteStep(input)
    sendInviteMember(member)
    return new WorkflowResponse(member)
  }
)
