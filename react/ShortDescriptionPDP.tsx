import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const ShortDescriptionPDP: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescriptionPDP] = useState()

  const getShortDescriptionPDP = async () => {
    // console.log('short description: ', productContextValue );
    if (productContextValue.selectedItem) {
        let urlSD = `/api/catalog/pvt/product/${productContextValue.product.productId}/specification/`;
        // let urlRFFisica = `/api/catalog/pvt/product/${productContextValue.product.productId}`;
      
      let resSD = await fetch(urlSD);
      let SD = await resSD.json();
      console.log(SD[6].Text);
      setDescriptionPDP(SD[6].Text);

      // setDescription(txt);

      // console.log(txt+'...');
      console.log(SD);
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
