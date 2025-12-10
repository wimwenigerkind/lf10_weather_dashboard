import {Form, InputGroup, Spinner} from "react-bootstrap";
import SearchResults from "./SearchResults.tsx";
import type {citySearchResult} from "../types/citySearchResult.ts";

interface SearchFormProps {
  setSearchTerm: (value: string) => void;
  searchIsLoading: boolean;
  searchResults: citySearchResult[];
  errorMessage: string;
}

function SearchForm({setSearchTerm, searchIsLoading, searchResults, errorMessage}: SearchFormProps) {
  return (
    <div style={{position: "relative"}}>
      <Form className="d-flex">
        <InputGroup>
          <Form.Control
            placeholder="Search city..."
            aria-label="Search city"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchIsLoading && (
            <InputGroup.Text>
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </InputGroup.Text>
          )}
        </InputGroup>
      </Form>
      <SearchResults searchResults={searchResults} errorMessage={errorMessage}/>
    </div>
  )
}

export default SearchForm;