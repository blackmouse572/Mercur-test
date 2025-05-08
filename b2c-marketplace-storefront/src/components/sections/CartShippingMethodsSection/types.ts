import { HttpTypes } from "@medusajs/types"

export type ConvertToLocaleParamsMin = {
    amount: number
    currency_code?: string
}

// Extended cart item product type to include seller
export type ExtendedStoreProduct = HttpTypes.StoreProduct & {
    seller?: {
        id: string
        name: string
    }
}

// Cart item type definition
export type CartItem = {
    product?: ExtendedStoreProduct
    // Include other cart item properties as needed
}

export type StoreCardShippingMethod = HttpTypes.StoreCartShippingOption & {
    seller_id?: string
    service_zone?: {
        fulfillment_set: {
            type: string
        }
    }
}

export type ShippingProps = {
    cart: Omit<HttpTypes.StoreCart, "items"> & {
        items?: CartItem[]
    }
    availableShippingMethods: StoreCardShippingMethod[] | null
}
