import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import { apiKey_google } from './keys'
import Map from './components/Map'
import Listing from './components/Listing'
import Filters from './components/Filters'
import styles from './style.css'

import { useJsApiLoader } from '@react-google-maps/api'

const StoreMap: FC = () => {
  const [allStores, setAllStores] = useState([])
  const [stores, setStores]: any = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [currentPosition, setCurrentPosition] = useState()
  const [focus, setFocus] = useState(undefined)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey_google,
    libraries: ['places'],
    region: 'MX',
  })

  const askForCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p: any) =>
        setCurrentPosition(p.coords)
      )
    }
  }

  const getStores: VoidFunction = async () => {
    let page = 1
    let pageSize = 100
    const url = `api/logistics/pvt/configuration/pickuppoints/_search?page=${page}&pageSize=${pageSize}`
    const res = await fetch(url)
    let { items } = await res.json()
    let opt: any = []

    items = items.filter((i: any) => i.isActive)
    console.log("ITEMS: ",items)
    items.forEach((i: any) => {
      if (i.address.state) {
        if (!opt.find((o: any) => o.value === i.address.state)) {
          opt.push({ value: i.address.state, label: i.address.state })
        }
      }
    })
    setSelectOptions(opt)
    setStores(items)
    setAllStores(items)
  }

  const handleStoreFilter = (sts: any) => {
    if (sts) {
      setStores(sts)
      return
    }
    setStores(allStores)
  }

  useEffect(() => {
    window.innerWidth <= 640 ? setIsMobile(true) : setIsMobile(false);
    getStores()
    askForCurrentPosition()
  }, [])

  if (!isLoaded) return null

  // if (isMobile){
  //   return (
  //     <div className="container-storemap">
  //       <div className="row-filters">
  //         <Filters
  //           isMobile={isMobile}
  //           handleStoreFilter={handleStoreFilter}
  //           stores={allStores}
  //           options={selectOptions}
  //           currentPosition={currentPosition}
  //         />
  //       </div>
  //       <div
  //         className="row-listing"
  //         style={{ paddingLeft: '0px', paddingRight: '0px' }}
  //       >
  //         <Listing stores={stores} isMobile={isMobile} focusStore={setFocus} />
  //       </div>
  //       <div
  //         className="row-stores"
  //         style={{
  //           height: '400px',
  //           paddingLeft: '0px',
  //           paddingRight: '0px',
  //         }}
  //       >
  //         <Map stores={stores} focusedStore={focus} />
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="row-1">
      <div >
        <Filters
          isMobile={isMobile}
          handleStoreFilter={handleStoreFilter}
          stores={allStores}
          options={selectOptions}
          currentPosition={currentPosition}
        />
      </div>
      <div className={styles.contMap}>
        <div
          className={styles.listingStores}
          style={{ paddingLeft: '10px', paddingRight: '10px', minWidth: "240px" }}
        >
          <Listing stores={stores} isMobile={isMobile} focusStore={setFocus} />
        </div>
        <div
          className={styles.map}
          style={{
            height: '500px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingBottom: '30px',
          }}
        >
          <Map stores={stores} focusedStore={focus} />
        </div>
      </div>
    </div>
  )
}

export default StoreMap
