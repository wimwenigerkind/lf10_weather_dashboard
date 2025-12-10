import type {citySearchResult} from "../types/citySearchResult.ts";
import ForecastChart from "./ForecastChart.tsx";

export default function CityInfo({city}: { city: citySearchResult }) {
  return (
    <>
      <span>Infos about the selected city: {city.name}</span>
      <ForecastChart city={city}/>
    </>
  )
}