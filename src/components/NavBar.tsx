import {Badge, CloseButton, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import SearchForm from "./SearchForm.tsx";
import type {citySearchResult} from "../types/citySearchResult";
import {useCity} from "../hooks/useCity";

interface NavBarProps {
  setSearchTerm: (value: string) => void;
  searchIsLoading: boolean;
  searchResults: citySearchResult[];
  errorMessage: string;
}

function NavBar({setSearchTerm, searchIsLoading, searchResults, errorMessage}: NavBarProps) {
  const {selectedCity, setSelectedCity} = useCity()

  return (
    <Navbar expand='lg' className="bg-body-tertiary">
      <Container>
        <div className="d-flex flex-column">
          <NavLink to="/" className="navbar-brand">Weather Dashboard</NavLink>
          {selectedCity && (
            <div className="d-flex gap-2">
              <span>Selected City:</span>
              <Badge bg="primary">{selectedCity.name}</Badge>
              <CloseButton onClick={() => setSelectedCity(null)}></CloseButton>
            </div>
          )}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
            {selectedCity && (
              <NavLink to={`/city/${selectedCity.id}`} className="nav-link">{selectedCity?.name}</NavLink>
            )}
          </Nav>
          <SearchForm setSearchTerm={setSearchTerm} searchIsLoading={searchIsLoading} searchResults={searchResults} errorMessage={errorMessage}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
