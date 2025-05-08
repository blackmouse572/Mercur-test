"use client"

import { Modal } from "@/components/molecules"
import { useRouter } from "next/navigation"
import { FC } from "react"

type MissingModalProps = {
  missingSellers: string[] | undefined
  isOpen: boolean
  onClose: () => void
}

export const MissingModal: FC<MissingModalProps> = ({
  missingSellers,
  isOpen,
  onClose,
}) => {
  const router = useRouter()

  if (!isOpen) return null

  return (
    <Modal
      heading="Missing seller shipping option"
      onClose={() => router.push("/cart")}
    >
      <div className="p-4">
        <h2 className="heading-sm">
          Some of the sellers in your cart do not have shipping options.
        </h2>

        <p className="text-md mt-3">
          Please remove the{" "}
          <span className="font-bold">
            {missingSellers?.map(
              (seller, index) =>
                `${seller}${index === missingSellers.length - 1 ? " " : ", "}`
            )}
          </span>{" "}
          items or contact{" "}
          {missingSellers && missingSellers?.length > 1 ? "them" : "him"} to get
          the shipping options.
        </p>
      </div>
    </Modal>
  )
}
