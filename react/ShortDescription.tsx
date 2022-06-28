import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const ShortDescription: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescription] = useState()

  const getShortDescription = () => {
    if (productContextValue.selectedItem) {
      if (productContextValue.selectedItem.complementName) {
        setDescription(productContextValue.selectedItem.complementName)
      }
    }
  }

  useEffect(() => {
    getShortDescription()
  }, [productContextValue])

  return description ? (
    <span className="vtex-flex--customShortDescription">{description}</span>
  ) : (
    <span className="vtex-flex--noCustomShortDescription"></span>
  )
}

export default ShortDescription
