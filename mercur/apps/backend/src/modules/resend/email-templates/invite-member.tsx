import { MemberInviteDTO } from '#/modules/seller/types'

interface InviteMember {
  data: MemberInviteDTO
}

export const InviteMemberTemplate: React.FC<Readonly<InviteMember>> = ({
  data
}) => {
  return (
    <div>
      <h1>Hello, {data.email}</h1>
      <p>
        You have been invited to join the {data.seller?.name} vendor platform as
        a member. To accept the invitation, please click the link below:
      </p>
      <p>
        Here the token if you need it: <strong>{data.token}</strong>
      </p>
      <p>Best regards, The NXT Team</p>
    </div>
  )
}
