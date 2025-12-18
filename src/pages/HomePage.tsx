import {useFavoriteCities} from "../hooks/useFavoriteCities.ts";
import CityCard from "../components/CityCard.tsx";

function HomePage() {
  const {favoriteCities} = useFavoriteCities()

  return (
    <>
      <h1>Favorites</h1>
      <div className="row g-3">
        {favoriteCities.length > 0 ?
          favoriteCities.map((city) => (
            <div key={city.id} className="col-12 col-md-6 col-lg-4">
              <CityCard city={city}/>
            </div>
          )):(
            <span>No favorites selected</span>
          )
        }
      </div>
    </>
  )
}

export default HomePage
