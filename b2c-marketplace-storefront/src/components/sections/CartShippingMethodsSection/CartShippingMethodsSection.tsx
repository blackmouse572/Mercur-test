"use client"

import { setShippingMethod } from "@/lib/data/cart"
import { calculatePriceForShippingOption } from "@/lib/data/fulfillment"
import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/atoms"

import { MissingModal } from "./MissingModal"
import EditDelivery from "./EditDelivery"
import DisplayDelivery from "./DisplayDelivery"
import { ShippingProps } from "./types"

const CartShippingMethodsSection: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoadingPrices, setIsLoadingPrices] = useState(false)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [missingModal, setMissingModal] = useState(false)
  const [missingShippingSellers, setMissingShippingSellers] = useState<
    string[]
  >([])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  useEffect(() => {
    const set = new Set<string>()
    cart.items?.forEach((item) => {
      if (item?.product?.seller?.id) {
        set.add(item.product.seller.id)
      }
    })

    const sellerMethods = _shippingMethods?.map(({ seller_id }) => seller_id)

    const missingSellerIds = [...set].filter(
      (sellerId) => !sellerMethods?.includes(sellerId)
    )

    setMissingShippingSellers(Array.from(missingSellerIds))

    if (missingSellerIds.length > 0 && !cart.shipping_methods?.length) {
      setMissingModal(true)
    }
  }, [cart])

  useEffect(() => {
    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }
  }, [availableShippingMethods])

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }
  const handleSetShippingMethod = async (id: string | null) => {
    setIsLoadingPrices(true)
    setError(null)

    if (!id) {
      setIsLoadingPrices(false)
      return
    }

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id }).catch(
      (err) => {
        setError(err.message)
      }
    )

    setIsLoadingPrices(false)
  }

  // Convert to string for EditDelivery component
  const wrappedHandleSetShippingMethod = (id: string) => {
    handleSetShippingMethod(id)
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const groupedBySellerId = _shippingMethods?.reduce((acc: any, method) => {
    const sellerId = method.seller_id!

    if (!acc[sellerId]) {
      acc[sellerId] = []
    }

    acc[sellerId].push(method)
    return acc
  }, {})

  const handleEdit = () => {
    router.replace(pathname + "?step=delivery")
  }
  const missingSellers = cart.items
    ?.filter((item) =>
      missingShippingSellers.includes(item.product?.seller?.id!)
    )
    .map((item) => item.product?.seller?.name)
    .filter((name): name is string => !!name)
  return (
    <div className="border p-4 rounded-sm bg-ui-bg-interactive">
      <MissingModal
        missingSellers={missingSellers}
        isOpen={missingModal}
        onClose={() => setMissingModal(false)}
      />
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-center"
        >
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid />
          )}
          Delivery
        </Heading>
        {!isOpen && (
          <Text>
            <Button onClick={handleEdit} variant="tonal">
              Edit
            </Button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <EditDelivery
          groupedBySellerId={groupedBySellerId}
          cart={cart}
          calculatedPricesMap={calculatedPricesMap}
          isLoadingPrices={isLoadingPrices}
          onSetShippingMethod={handleSetShippingMethod}
          onSubmit={handleSubmit}
          error={error}
        />
      ) : (
        <DisplayDelivery cart={cart} />
      )}
    </div>
  )
}

export default CartShippingMethodsSection
