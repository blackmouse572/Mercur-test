import { MemberInviteDTO } from '#/modules/seller/types'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text
} from '@react-email/components'

type InviteMember = Readonly<MemberInviteDTO>

export const InviteMemberTemplate: React.FC<Readonly<InviteMember>> = (
  data
) => {
  return (
    <Html>
      <Head />
      <Body>
        <Preview>
          You have been invited to join the vendor platform as a member.
        </Preview>
        <Container>
          <Heading>Hello!</Heading>
          <Text>
            You have been invited to join the vendor platform as a member. To
            accept the invitation, please click the link below:
          </Text>
          <Text>
            Here the token if you need it: <strong>{data.token}</strong>
          </Text>
          <Text>Best regards, The NXT Team</Text>
        </Container>
      </Body>
    </Html>
  )
}
