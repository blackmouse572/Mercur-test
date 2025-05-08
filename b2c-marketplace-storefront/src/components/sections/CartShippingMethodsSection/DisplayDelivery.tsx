"use client"

import { FC } from "react"
import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import { ConvertToLocaleParamsMin } from "./types"
import { convertToLocale } from "@/lib/helpers/money"

type DisplayDeliveryProps = {
  cart: any
}

export const DisplayDelivery: FC<DisplayDeliveryProps> = ({ cart }) => {
  const hasShippingMethods = (cart?.shipping_methods?.length ?? 0) > 0

  if (!hasShippingMethods) {
    return null
  }

  return (
    <div>
      <div className="text-small-regular">
        <div className="flex flex-col">
          {cart.shipping_methods?.map(
            (method: HttpTypes.StoreCartShippingMethod) => (
              <div key={method.id} className="mb-4 border rounded-md p-4">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {method.name}{" "}
                  {convertToLocale({
                    amount: method.amount,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayDelivery
