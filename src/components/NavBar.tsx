import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import SearchForm from "./SearchForm.tsx";
import type {citySearchResult} from "../types/citySearchResult";

interface NavBarProps {
  setSearchTerm: (value: string) => void;
  searchIsLoading: boolean;
  searchResults: citySearchResult[];
  errorMessage: string;
}

function NavBar({setSearchTerm, searchIsLoading, searchResults, errorMessage}: NavBarProps) {
  return (
    <Navbar expand='lg' className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">Weather Dashboard</NavLink>
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
