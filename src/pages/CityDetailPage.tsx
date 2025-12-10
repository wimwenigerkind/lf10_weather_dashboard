import {useCity} from "../hooks/useCity";
import CityHeader from "../components/CityHeader.tsx";
import CityInfo from "../components/CityInfo.tsx";

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