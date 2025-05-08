"use client"

import { FC } from "react"
import { Heading } from "@medusajs/ui"
import { DeliveryCard } from "./DeliveryCard"
import { StoreCardShippingMethod } from "./types"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/helpers/money"

type SellerContainerProps = {
  sellerName: string
  options: StoreCardShippingMethod[]
  calculatedPricesMap: Record<string, number>
  isLoadingPrices: boolean
  cart: any
  onSetShippingMethod: (id: string) => void
}

export const SellerContainer: FC<SellerContainerProps> = ({
  sellerName,
  options,
  calculatedPricesMap,
  isLoadingPrices,
  cart,
  onSetShippingMethod,
}) => (
  <div>
    <Heading level="h3" className="mb-2">
      {sellerName}
    </Heading>
    <div className="space-y-3 mt-2">
      {options.map((option: any) => {
        const isSelected = cart.shipping_methods?.some(
          (method: HttpTypes.StoreCartShippingMethod) => method.id === option.id
        )
        const price =
          option.price_type === "flat"
            ? convertToLocale({
                amount: option.amount!,
                currency_code: cart?.currency_code,
              })
            : calculatedPricesMap[option.id]
            ? convertToLocale({
                amount: calculatedPricesMap[option.id],
                currency_code: cart?.currency_code,
              })
            : isLoadingPrices
            ? "Loading..."
            : "-"

        return (
          <DeliveryCard
            key={option.id}
            option={option}
            isSelected={isSelected}
            price={price}
            isLoadingPrices={isLoadingPrices}
            onSelect={onSetShippingMethod}
          />
        )
      })}
    </div>
  </div>
)
