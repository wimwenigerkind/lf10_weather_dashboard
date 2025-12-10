import {Form, InputGroup, Spinner} from "react-bootstrap";
import type {citySearchResult} from "../types/citySearchResult.ts";

interface SearchFormProps {
    setSearchTerm: (value: string) => void;
    searchIsLoading: boolean;
    searchResults: citySearchResult[];
}

function SearchForm({setSearchTerm, searchIsLoading, searchResults}: SearchFormProps) {
    console.log(searchResults);
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
        </div>
    )
}

export default SearchForm;