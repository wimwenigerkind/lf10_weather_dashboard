import type {citySearchResult} from "../types/citySearchResult.ts";
import FavoriteCityButton from "./FavoriteCityButton.tsx";
import {searchImage} from "../services/imageService.ts";
import {useEffect, useState} from "react";

export default function CityHeader({city}: { city: citySearchResult }) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    searchImage(city.name).then(url => {
      setImageUrl(url);
    });
  }, [city.name]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>{city.name}</h1>
        <FavoriteCityButton city={city}/>
      </div>
      <img src={imageUrl} className="img-fluid rounded"/>
      <div className="mb-4 d-flex justify-content-between mt-2">
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