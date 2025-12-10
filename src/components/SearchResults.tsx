import {ListGroup} from "react-bootstrap";
import type {citySearchResult} from "../types/citySearchResult.ts";
import SearchResultItem from "./SearchResultItem.tsx";

interface SearchResultsProps {
  searchResults: citySearchResult[]
  errorMessage: string;
}

function SearchResults({searchResults, errorMessage}: SearchResultsProps) {
  const showResults = searchResults.length > 0;
  const showErrors = errorMessage.length > 0

  return (
    <>
      <div className="search--results">
        {showErrors && (
          <ListGroup>
            <ListGroup.Item variant="danger">
              {errorMessage}
            </ListGroup.Item>
          </ListGroup>
        )}
        {showResults && (
          <ListGroup>
            {searchResults.map((city) => (
              <ListGroup.Item key={city.id} action onClick={() => {
                console.log('Selected City: ', city)
              }}>
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