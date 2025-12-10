import type {citySearchResult} from "../types/citySearchResult.ts";

export default function CityInfo({city}: { city: citySearchResult }) {
  return (
    <>
      <span>Infos about the selected city: {city.name}</span>
    </>
  )
}