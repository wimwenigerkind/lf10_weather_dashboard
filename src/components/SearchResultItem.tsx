import type {citySearchResult} from "../types/citySearchResult.ts";

function SearchResultItem({ city }: { city: citySearchResult }) {
    return (
        <div>
            <h5>{city.name}</h5>
            <p>{city.country} {city.country_code && `(${city.country_code})`}</p>
        </div>
    );
}

export default SearchResultItem;