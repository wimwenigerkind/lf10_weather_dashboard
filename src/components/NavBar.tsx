import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import SearchForm from "./SearchForm.tsx";
import type {citySearchResult} from "../types/citySearchResult";
import {useCity} from "../contexts/CityContext.tsx";

interface NavBarProps {
  setSearchTerm: (value: string) => void;
  searchIsLoading: boolean;
  searchResults: citySearchResult[];
  errorMessage: string;
}

function NavBar({setSearchTerm, searchIsLoading, searchResults, errorMessage}: NavBarProps) {
  const {selectedCity} = useCity()

  return (
    <Navbar expand='lg' className="bg-body-tertiary">
      <Container>
        <div className="d-flex flex-column">
          <NavLink to="/" className="navbar-brand">Weather Dashboard</NavLink>
          {selectedCity && (
            <span>Selected City: <Badge bg="primary">{selectedCity.name}</Badge></span>
          )}
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
          </Nav>
          <SearchForm setSearchTerm={setSearchTerm} searchIsLoading={searchIsLoading} searchResults={searchResults} errorMessage={errorMessage}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
