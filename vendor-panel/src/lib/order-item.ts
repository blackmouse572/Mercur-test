import { OrderLineItemDTO } from "@medusajs/types"

export const getFulfillableQuantity = (item: Pick<OrderLineItemDTO, 'quantity' | 'detail'>) => {
  return item.quantity - item.detail.fulfilled_quantity
}
