import { BaseHit, Hit } from "instantsearch.js"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

export const ProductCardImage = ({
  product,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
}) => {
  return product.thumbnail ? (
    <Image
      src={decodeURIComponent(product.thumbnail)}
      alt={product.title}
      width={360}
      height={360}
      className="object-cover aspect-square w-full object-center h-full lg:group-hover:-mt-14 transition-all duration-300 rounded-xs"
      priority
    />
  ) : (
    <Image
      src="/images/placeholder.svg"
      alt="Product placeholder"
      width={100}
      height={100}
      className="flex margin-auto w-[100px] h-auto"
    />
  )
}
