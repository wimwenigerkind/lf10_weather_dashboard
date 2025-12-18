import type {citySearchResult} from "../types/citySearchResult.ts";
import {useEffect, useState} from "react";
import {searchImage} from "../services/imageService.ts";
import {Card} from "react-bootstrap";
import {useCity} from "../hooks/useCity.ts";
import FavoriteCityButton from "./FavoriteCityButton.tsx";

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
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={city.name}
        style={{
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <Card.Body>
        <Card.Title>{city.name}</Card.Title>
        <Card.Text>{city.country}, {city.country_code}</Card.Text>
        <div className={"d-flex justify-content-between align-items-center"}>
          <FavoriteCityButton city={city}/>
          <button onClick={() => setSelectedCity(city)} className="btn btn-primary">Select</button>
        </div>
      </Card.Body>
    </Card>
  )
}