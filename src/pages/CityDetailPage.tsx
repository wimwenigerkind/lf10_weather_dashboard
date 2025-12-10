import {useCity} from "../contexts/CityContext.tsx";
import type {citySearchResult} from "../types/citySearchResult.ts";

function CityHeader({city}: { city: citySearchResult }) {
  return (
    <>
      <h1>{city.name}</h1>
      <div className="mb-4 d-flex justify-content-between">
        <div className="row">
          <span>{city.country}, {city.country_code}</span>
          <span>{city.latitude}, {city.longitude}</span>
        </div>
        <div>
          <div className="row">
            <span className="col">Population:</span>
            <span className="col text-end">{city.population}</span>
          </div>
          <div className="row">
            <span className="col">Timezone:</span>
            <span className="col text-end">{city.timezone}</span>
          </div>
        </div>
      </div>
    </>
  )
}

function CityInfo({city}: { city: citySearchResult }) {
  return (
    <>
      <span>Infos about the selected city: {city.name}</span>
    </>
  )
}

function CityDetailPage() {
  const {selectedCity} = useCity()

  return (
    <>
      {selectedCity ? (
        <>
          <CityHeader city={selectedCity}/>
          <CityInfo city={selectedCity}/>
        </>
      ) : (
        <h1>No City Selected</h1>
      )}
    </>
  )
}

export default CityDetailPage