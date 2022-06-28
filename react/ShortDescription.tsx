import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const ShortDescription: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescription] = useState()

  const getShortDescription = async () => {
    console.log('short description: ', productContextValue );
    if (productContextValue.selectedItem) {
        let urlRFFisica = `/api/catalog/pvt/product/${productContextValue.product.productId}`;
        let resRFFisica = await fetch(urlRFFisica);
      let razonRFFisica = await resRFFisica.json();
      setDescription(razonRFFisica.DescriptionShort);
      console.log(razonRFFisica);
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
