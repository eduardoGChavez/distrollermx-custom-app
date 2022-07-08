import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

const ShortDescription: FC = () => {
  const productContextValue = useProduct()
  const [description, setDescription] = useState()

  const getShortDescription = async () => {
    
    if (productContextValue.selectedItem) {
      let urlSD = `/api/catalog/pvt/product/${productContextValue.product.productId}/specification/`;      
      let resSD = await fetch(urlSD);
      let SD = await resSD.json();

      SD.map((specification:any) => {
        if( specification.FieldId === 34 && specification.Text.length > 0) {
          let txt = specification.Text;
          if (txt.length > 57) {
            let txtSplit = txt.split(' ');
            let letras='';
            txtSplit.map((palabra: string) => {
              if ((letras + ' ' + palabra).length < 55) {
                letras = letras + " " + palabra;
              }
              else {
                txt = letras + "...";
              }
            })
          }
          setDescription(txt);
        }
      });

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
