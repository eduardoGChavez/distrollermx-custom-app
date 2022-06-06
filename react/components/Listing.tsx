import * as React from 'react'
import { FC, useState } from 'react'
import StoreDetails from '../Modal/StoreDetails'
import style from "../style.css"

export interface ListingProps {
  stores: Array<any>
  isMobile: Boolean
  focusStore: Function
}

const Listing: FC<ListingProps> = ({ stores, isMobile, focusStore }) => {

  const [modal, setModal] = useState({ isOpen: false, store: null })

  const handleOpenModal = (store: any) => {
    setModal({ isOpen: true, store })
  }

  const handleCloseModal = () => {
    setModal({ isOpen: false, store: null })
  }

  const handleFocusStore = (idx: any) => {
    isMobile ? window.scrollTo(0,450) : null
    focusStore(idx)
  }

  return (
    <>
    <div className={style.listContainer}>
      <ul
        className={style.list}
        style={{
          maxHeight: '500px',
          marginTop: "0px"
        }}
      >
        {stores.length > 0 ? (
          stores.map(({ address, name }, idx: any) => (
            <li
              key={idx}
              // className="list-group-item list-group-item-action"
              className={style.listItem}
              onClick={() => handleFocusStore(idx)}
            >
              <span>
                <span
                className={style.listItemName}

                >
                  {name}{' '}
                </span>
                {/* <i style={{ fontFamily: "ACaslonPro-Regular", fontSize: '14px', paddingBottom: "20px"}}>
                {description}
              </i> */}
              </span>
              <br />
              <span>
                <span
                className={style.listItemAddress}
                >
                  {address.street} {address.number}, {address.neighborhood}, {address.city}.  <br />
                  {address.state} - {address.postalCode}.
                </span>
                <br />
                <span>
                    <a
                    className={style.moreDetails}
                      href="#"
                      onClick={() => {
                        handleOpenModal(stores[idx])
                      }}
                    >
                      MÁS DETALLES
                      {/* <img style={{marginLeft: "5px"}} src="/arquivos/right-arrow.png" /> */}
                    </a>
                  </span>
              </span>
              {/* <span>T.{instructions}</span> */}
            </li>
          ))
        ) : (
          <li>
            <span
              className={style.listItemAddress}
            >
              Sin resultados
            </span>
          </li>
        )}
      </ul>
    </div>
    <StoreDetails
    isOpen={modal.isOpen}
    store={modal.store}
    handleClose={handleCloseModal}
  />
  </>
  )
}

export default Listing
