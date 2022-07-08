import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const ShortDescription: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescription] = useState()

  const getShortDescription = async () => {
    // console.log('short description: ', productContextValue );
    if (productContextValue.selectedItem) {
        let urlSD = `/api/catalog/pvt/product/${productContextValue.product.productId}/specification/`;
        // let urlRFFisica = `/api/catalog/pvt/product/${productContextValue.product.productId}`;
      
      let resSD = await fetch(urlSD);
      let SD = await resSD.json();
      // console.log(razonRFFisica[6].Text);
      // setDescription(razonRFFisica[6].Text);
      let txt = SD[6].Text;
      if (txt.length > 57) {
        let txtSplit = txt.split(' ');
        let letras='';
        txtSplit.map((palabra: string) => {
          if ((letras +' '+ palabra).length < 55) {
            letras = letras +" "+ palabra;
          }
          else {
            txt = letras+"...";
          }
        })
        // txt = txt.substring(0, 60) + "...";
      }

      setDescription(txt);

      // console.log(txt+'...');
      // console.log(razonRFFisica);
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
