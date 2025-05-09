import Image from "next/image"

export const OrderProductListItemImage = ({ item }: { item: any }) =>
  item.thumbnail ? (
    <Image src={item.thumbnail} alt={item.title} fill objectFit="cover" />
  ) : (
    <Image
      src="/images/placeholder.svg"
      alt="Product placeholder"
      fill
      objectFit="cover"
    />
  )
