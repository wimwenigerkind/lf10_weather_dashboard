import type {citySearchResult} from "../types/citySearchResult.ts";
import {useEffect, useState} from "react";
import {searchImage} from "../services/imageService.ts";
import {Card} from "react-bootstrap";
import {useCity} from "../hooks/useCity.ts";

export default function CityCard({city}: {city: citySearchResult}) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const {setSelectedCity} = useCity()

  useEffect(() => {
    searchImage(city.name).then(url => {
      setImageUrl(url);
    });
  }, [city.name]);

  return (
    <Card>
      <img src={imageUrl} className="card-img-left" alt=""/>
      <div className="card-body">
        <h5 className="card-title">{city.name}</h5>
        <p className="card-text">{city.country}, {city.country_code}</p>
        <button onClick={() => setSelectedCity(city)} className="btn btn-primary">Select</button>
      </div>
    </Card>
  )
}