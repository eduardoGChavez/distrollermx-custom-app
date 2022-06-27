import * as React from 'react'
import { useState, useEffect } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { Distance, MAX_DISTANCE } from '../utils'
import styles from '../style.css'

export interface FiltersProps {
  handleStoreFilter: Function
  stores: Array<any>
  options: Array<any>
  isMobile: Boolean
  currentPosition: any
}

const Filters: React.FC<FiltersProps> = ({
  stores,
  handleStoreFilter,
  options,
  isMobile,
  currentPosition,
}) => {
  const [autocomplete, setAutocomplete]: any = useState()
  const [currentFilters, setCurrentFilters] = useState({
    clientGeoPosition: { lat: undefined, lng: undefined },
    storeType: undefined,
  })

  const onLoad = (autComplete: any) => {
    setAutocomplete(autComplete)
  }

  const handlefilterByDistance = (clear: any) => {
    if (!clear && autocomplete.getPlace().geometry) {
      let clientGeoPoint = autocomplete.getPlace().geometry.location.toJSON()
      let sts = stores.filter(
        (s) =>
          Distance(
            clientGeoPoint.lat,
            clientGeoPoint.lng,
            s?.address?.location?.latitude,
            s?.address?.location?.longitude
          ) < MAX_DISTANCE
      )
      if (currentFilters.storeType) {
        sts = sts.filter((s) => s.address.state === currentFilters.storeType)
      }
      handleStoreFilter(sts)
      setCurrentFilters({
        ...currentFilters,
        clientGeoPosition: clientGeoPoint,
      })
    } else {
      setCurrentFilters({
        ...currentFilters,
        clientGeoPosition: { lat: undefined, lng: undefined },
      })
      if (currentFilters.storeType) {
        let sts = stores.filter(
          (s) => s.address.state === currentFilters.storeType
        )
        handleStoreFilter(sts)
      } else {
        handleStoreFilter(stores)
      }
    }
  }

  const handleFilterByStoreType = (e: any, currentPosition: any) => {
    if (!e) {
      return
    }
    const value = e.value
    if (value == 0) {
      setCurrentFilters({ ...currentFilters, storeType: undefined })
      if (currentFilters.clientGeoPosition.lat || currentPosition) {
        const { lat, lng } = currentFilters.clientGeoPosition.lat
          ? currentFilters.clientGeoPosition
          : { lat: currentPosition.latitude, lng: currentPosition.longitude }
        let sts = stores.filter(
          (s) =>
            Distance(
              lat,
              lng,
              s?.address?.location?.latitude,
              s?.address?.location?.longitude
            ) < MAX_DISTANCE
        )
        handleStoreFilter(sts)
      } else {
        handleStoreFilter(stores)
      }
    } else {
      setCurrentFilters({ ...currentFilters, storeType: value })
      let sts = stores.filter((s) => s.address.state === value)
      if (currentFilters.clientGeoPosition.lat || currentPosition) {
        const { lat, lng } = currentFilters.clientGeoPosition.lat
          ? currentFilters.clientGeoPosition
          : { lat: currentPosition.latitude, lng: currentPosition.longitude }
        sts = sts.filter(
          (s) =>
            Distance(
              lat,
              lng,
              s?.address?.location?.latitude,
              s?.address?.location?.longitude
            ) < MAX_DISTANCE
        )
      }
      handleStoreFilter(sts)
    }
  }

  const insertDireccion = async () => {
    const element: any = document.getElementById('addressCustomMap')
    if (element) {
      element.value = 'Tu ubicación actual'
    }
  }

  useEffect(() => {
    // const url = new URL(location.href)
    // const type = url.searchParams.get('type')

    if (currentPosition) {
      // const value = options.find(
      //   (o) => o.value.toLowerCase() === type.toLowerCase()
      // )
      handleFilterByStoreType({value: 0}, currentPosition)
      insertDireccion()
    } /* else if (type) {
      const value = options.find(
        (o) => o.value.toLowerCase() === type.toLowerCase()
      )
      // console.log("COOORDS: ",value)
      handleFilterByStoreType(value, undefined)
    } */
  }, [options, stores, currentPosition])

  const clearAddressInput = () => {
    const element: any = document.getElementById('addressCustomMap')
    if (element) {
      element.value = ''
    }
  }


  return (
    <div className={styles.filterContainerMain}>
      <div
        className={styles.filter}
      >
        <select
          className={styles.filterSelect}
          name="storeType"
          id="store-type"
          onChange={(e) => handleFilterByStoreType(e.target, undefined)}
        >
          <option value={0}>Todas</option>
          {options.map((o, idx) => (
            <option value={o.value} key={idx}>

              {o.label}
            </option>
          ))}
        </select>
      </div>
      {/* <div
        className={styles.buttonSeeAll}
        hidden={currentFilters.storeType ? false : true}
      >
        <button
          onClick={() => handleFilterByStoreType({ value: 0 }, undefined)}
          className={styles.bottonSeeAll}
        >
          Ver todas
        </button>
      </div> */}
      <div className={styles.adressInput}>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={() => handlefilterByDistance(false)}
        >
          <input
            id="addressCustomMap"
            type="text"
            placeholder="Ingresa una dirección"
            className={styles.adressAutocomplete}
            style={{
              width: isMobile ? '100%' : `300px`,
            }}
          />
        </Autocomplete>
        <button
          className={styles.clearButton}
          onClick={() => {
            clearAddressInput()
            handlefilterByDistance(true)
          }}
          type="reset"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default Filters
