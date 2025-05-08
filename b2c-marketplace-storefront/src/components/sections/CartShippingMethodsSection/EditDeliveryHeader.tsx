"use client"

import { FC } from "react"
import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text } from "@medusajs/ui"
import { Button } from "@/components/atoms"

type EditDeliveryHeaderProps = {
  isOpen: boolean
  hasShippingMethods: boolean
  onEdit: () => void
}

export const EditDeliveryHeader: FC<EditDeliveryHeaderProps> = ({
  isOpen,
  hasShippingMethods,
  onEdit,
}) => (
  <div className="flex flex-row items-center justify-between mb-6">
    <Heading
      level="h2"
      className="flex flex-row text-3xl-regular gap-x-2 items-center"
    >
      {!isOpen && hasShippingMethods && <CheckCircleSolid />}
      Delivery
    </Heading>
    {!isOpen && (
      <Text>
        <Button onClick={onEdit} variant="tonal">
          Edit
        </Button>
      </Text>
    )}
  </div>
)

export default EditDeliveryHeader
