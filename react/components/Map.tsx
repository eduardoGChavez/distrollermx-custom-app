import * as React from 'react'
import { useEffect, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
// import Filters from './Filters';

export interface MapProps {
  stores: Array<any>
  focusedStore: any
}

const Map: React.FC<MapProps> = ({ stores, focusedStore }) => {
  const google = (window as any).google
  const [map, setMap]: any = useState()

  // console.log('MUESRTAGOOGLE', google)

  const updateMap = () => {
    if (google && map) {
      // console.log('window', window)
      if (stores.length === 0) {
        map.setCenter({ lat: 20.657716131728346, lng: -103.35052292879541 })
        // 20.657716131728346, -103.35052292879541 GDL coordinates
        map.setZoom(11)
        return
      }
      const bounds = new google.maps.LatLngBounds()
      stores.forEach((s) => {
        bounds.extend({
          lat: s?.address?.location?.latitude,
          lng: s?.address?.location?.longitude,
        })
      })
      map.fitBounds(bounds)
    }
  }

  const focusStore = (idxStore: any) => {
    if(idxStore != undefined) {
      const store = stores[idxStore]
      const [lat, lng] = [store.address.location.latitude, store.address.location.longitude]
      map.setCenter({ lat, lng })
      map.setZoom(20)
    }
  }

  useEffect(() => {
    focusStore(focusedStore)
  }, [focusedStore])

  useEffect(() => {
    updateMap()
  }, [stores, google])

  return (
    <GoogleMap
      ref={(ref) => setMap(ref?.state.map)}
      mapContainerStyle={{ height: '100%', width: '100%' }}
    >
      {stores.map((s, idx: any) => (
        <Marker
          key={idx}
          position={{
            lat: s?.address?.location?.latitude,
            lng: s?.address?.location?.longitude,
          }}
        />
      ))}
    </GoogleMap>
  )
}

export default Map
