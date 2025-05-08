"use client"

import { Loader } from "@medusajs/icons"
import { FC } from "react"
import { StoreCardShippingMethod } from "./types"

type DeliveryCardProps = {
  option: StoreCardShippingMethod
  isSelected: boolean
  price: string | React.ReactNode
  isLoadingPrices: boolean
  onSelect: (id: string) => void
}

export const DeliveryCard: FC<DeliveryCardProps> = ({
  option,
  isSelected,
  price,
  isLoadingPrices,
  onSelect,
}) => (
  <div
    key={option.id}
    tabIndex={-1}
    role="button"
    onClick={() => onSelect(option.id)}
    className={`relative border rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors ${
      isSelected ? "border-black bg-gray-50" : ""
    }`}
  >
    <div className="absolute top-3 right-3">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation()
          onSelect(option.id)
        }}
        className="h-4 w-4"
      />
    </div>
    <div className="pr-8">
      <div className="font-medium">{option.name}</div>
      <div className="text-gray-600 mt-1">
        {isLoadingPrices && option.price_type !== "flat" ? (
          <div className="flex items-center">
            <Loader />
          </div>
        ) : (
          price
        )}
      </div>
    </div>
  </div>
)
