import type {citySearchResult} from "../types/citySearchResult.ts";
import ForecastChart from "./ForecastChart.tsx";

export default function CityInfo({city}: { city: citySearchResult }) {
  return (
    <div className="d-flex flex-column">
      <span>Infos about the selected city: {city.name}</span>
      <ForecastChart city={city}/>
    </div>
  )
}