import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { defineWidgetConfig } from '@medusajs/admin-sdk'
import { AdminOrder, DetailWidgetProps } from '@medusajs/framework/types'
import { Avatar, Container, Heading, Skeleton, Text } from '@medusajs/ui'

import { JsonViewSection } from '../components/json-view-section'
import { api } from '../lib/client'
import { SectionRow } from '../routes/requests/components/section-row'

const OrderSellerDetails = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const { data: seller, isLoading } = useQuery({
    queryFn: () =>
      api.admin.adminGetOrderSeller(data.id).then((res) => res.data),
    queryKey: ['order-seller', data.id]
  })

  if (isLoading) {
    return (
      <Container className="divide-y p-0">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
      </Container>
    )
  }

  if (!seller?.seller) {
    return (
      <Container className="divide-y p-0 h-16 flex items-center justify-center">
        <Text size="small" leading="compact" className="text-ui-fg-subtle">
          No seller information available
        </Text>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Seller</Heading>
      </div>
      <div>
        <SectionRow
          title={'ID'}
          value={
            <Link
              to={`/seller/${seller?.seller?.id}`}
              className="focus:shadow-borders-focus rounded-[4px] outline-none transition-shadow"
            >
              <div className="flex items-center gap-x-2 overflow-hidden">
                <Avatar
                  size="2xsmall"
                  fallback={'NA'}
                  src={seller?.seller?.photo}
                />
                <Text
                  size="small"
                  leading="compact"
                  className="text-ui-fg-subtle hover:text-ui-fg-base transition-fg truncate"
                >
                  {seller?.seller?.name}
                </Text>
              </div>
            </Link>
          }
        />
      </div>
      <div className="p-2">
        <JsonViewSection
          className="scale-[0.95]"
          headingLevel="h3"
          data={seller?.seller}
        />
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: 'order.details.side.before'
})

export default OrderSellerDetails
