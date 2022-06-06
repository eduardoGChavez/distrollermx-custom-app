import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const LongDescription: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescription] = useState()

  const getLongDescription = () => {
    // console.log('PCONTEXR', productContextValue)
    if (productContextValue.selectedItem) {
      if (productContextValue.selectedItem.complementName) {
        setDescription(productContextValue.selectedItem.complementName)
      }
    }
  }

  useEffect(() => {
    getLongDescription()
  }, [productContextValue])

  return description ? (
    <span className="vtex-flex--customLongDescription">{description}</span>
  ) : (
    <span className="vtex-flex--noCustomLongDescription"></span>
  )
}

export default LongDescription
