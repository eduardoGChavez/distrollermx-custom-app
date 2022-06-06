import * as React from 'react'
import { FC } from 'react'
import { Modal } from 'vtex.styleguide'
import style from "../style.css"
import {format} from "../utils/format"
interface StoreDetailsProps {
  isOpen: boolean
  handleClose: Function
  store: any
}

const StoreDetails: FC<StoreDetailsProps> = ({
  isOpen,
  handleClose,
  store,
}) => {

  if(!store) {
    return null
  }

  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

  const {address, businessHours} = store
  const {street, number, city, state, postalCode} = address

  return (
    <Modal centered isOpen={isOpen} onClose={handleClose}>
      <div style={{margin: "auto"}}>
        <p className={style.title}>Dirección de la tienda</p>
        <p className={style.focusModal}>{number} {street} {city} {state} {postalCode}</p>
        <br />
        <p className={style.title}>Horario</p>
        <ul className={style.allListHours}>
          {businessHours.map((day: any, index: any) => (
            <li key={index} className={style.listHours}>
              <span className={style.businessHours}>
                <span> {days[index]}: </span>
                <span> {format(day.openingTime)} - {format(day.closingTime)} </span>
              </span>
            </li>
          ))}
        </ul>
        <br />
        {/* <p style={{display: "flex"}}>
          <span className={style.businessHours}>
            TEL:
          </span>
           <span style={{paddingLeft: "5px"}} className={style.focusModal}>
          {instructions}
          </span>
          </p> */}
      </div>
    </Modal>
  )
}

export default StoreDetails
