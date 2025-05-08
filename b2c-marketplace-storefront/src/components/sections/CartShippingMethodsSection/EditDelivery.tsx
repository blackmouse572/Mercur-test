"use client"

import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import { FC } from "react"
import { Button } from "@/components/atoms"
import { SellerContainer } from "./SellerContainer"
import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import { ConvertToLocaleParamsMin } from "./types"
import { convertToLocale } from "@/lib/helpers/money"

type EditDeliveryProps = {
  groupedBySellerId: Record<string, any[]>
  cart: any
  calculatedPricesMap: Record<string, number>
  isLoadingPrices: boolean
  onSetShippingMethod: (id: string) => void
  onSubmit: () => void
  error: string | null
}

export const EditDelivery: FC<EditDeliveryProps> = ({
  groupedBySellerId,
  cart,
  calculatedPricesMap,
  isLoadingPrices,
  onSetShippingMethod,
  onSubmit,
  error,
}) => {
  const hasShippingMethods = (cart?.shipping_methods?.length ?? 0) > 0

  return (
    <>
      <div className="grid">
        <div data-testid="delivery-options-container">
          <div className="pb-8 md:pt-0 pt-2 space-y-2 divide-y">
            {Object.keys(groupedBySellerId).map((key) => (
              <SellerContainer
                key={key}
                sellerName={groupedBySellerId[key][0].seller_name}
                options={groupedBySellerId[key]}
                calculatedPricesMap={calculatedPricesMap}
                isLoadingPrices={isLoadingPrices}
                cart={cart}
                onSetShippingMethod={onSetShippingMethod}
              />
            ))}

            {hasShippingMethods && (
              <div className="flex flex-col">
                {cart.shipping_methods?.map(
                  (method: HttpTypes.StoreCartShippingMethod) => (
                    <div key={method.id} className="mb-4 border rounded-md p-4">
                      <Text className="txt-medium-plus text-ui-fg-base mb-1">
                        Method
                      </Text>
                      <Text className="txt-medium text-ui-fg-subtle">
                        {method.name}
                        {convertToLocale({
                          amount: method.amount,
                          currency_code: cart?.currency_code,
                        })}
                      </Text>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <ErrorMessage
          error={error}
          data-testid="delivery-option-error-message"
        />
        <Button
          onClick={onSubmit}
          variant="tonal"
          disabled={!cart.shipping_methods?.[0]}
          loading={isLoadingPrices}
        >
          Continue to payment
        </Button>
      </div>
    </>
  )
}

export default EditDelivery
