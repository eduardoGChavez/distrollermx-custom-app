//Return distance between 2 geo points in km
export const Distance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
  const rad = (x: any) => {
    return (x * Math.PI) / 180
  }
  const R = 6378.137 //Earth radius in km
  const dLat: any = rad(lat2 - lat1)
  const dLong = rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d
}

export const MAX_DISTANCE = 6; //Maximun distance around to filter.
