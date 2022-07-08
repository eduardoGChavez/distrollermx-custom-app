import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const ShortDescriptionPDP: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescriptionPDP] = useState()

  const getShortDescriptionPDP = async () => {
    
    if (productContextValue.selectedItem) {
      let urlSD = `/api/catalog/pvt/product/${productContextValue.product.productId}/specification/`;      
      let resSD = await fetch(urlSD);
      let SD = await resSD.json();

      SD.map((specification:any) => {
        if( specification.FieldId === 34 && specification.Text.length > 0) {
          let txt = specification.Text;
          setDescriptionPDP(txt);
        }
      });

    }
  }

  useEffect(() => {
    getShortDescriptionPDP()
  }, [productContextValue])

  return description ? (
    <span className="vtex-flex--customShortDescriptionPDP">{description}</span>
  ) : (
    <span className="vtex-flex--noCustomShortDescriptionPDP"></span>
  )
}

export default ShortDescriptionPDP
