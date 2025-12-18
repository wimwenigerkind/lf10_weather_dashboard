import {ListGroup} from "react-bootstrap";
import type {citySearchResult} from "../types/citySearchResult.ts";
import SearchResultItem from "./SearchResultItem.tsx";
import {useCity} from "../hooks/useCity";

interface SearchResultsProps {
  searchResults: citySearchResult[]
  errorMessage: string;
}

function SearchResults({searchResults, errorMessage}: SearchResultsProps) {
  const {setSelectedCity} = useCity()

  return (
    <>
      <div className="search--results">
        {errorMessage.length > 0 && (
          <ListGroup>
            <ListGroup.Item variant="danger">
              {errorMessage}
            </ListGroup.Item>
          </ListGroup>
        )}
        {searchResults.length > 0 && (
          <ListGroup>
            {searchResults.map((city) => (
              <ListGroup.Item key={city.id} action onClick={() => setSelectedCity(city)}>
                <SearchResultItem city={city}/>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </>
  )
}

export default SearchResults;