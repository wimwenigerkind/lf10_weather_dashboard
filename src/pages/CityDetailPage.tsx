import {useCity} from "../hooks/useCity";
import type {citySearchResult} from "../types/citySearchResult.ts";
import CityHeader from "../components/CityHeader.tsx";

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