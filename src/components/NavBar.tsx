import {Badge, Button, CloseButton, Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import SearchForm from "./SearchForm.tsx";
import type {citySearchResult} from "../types/citySearchResult";
import {useCity} from "../hooks/useCity";
import {useAuth} from "../hooks/useAuth.ts";

interface NavBarProps {
  setSearchTerm: (value: string) => void;
  searchIsLoading: boolean;
  searchResults: citySearchResult[];
  errorMessage: string;
}

function NavBar({setSearchTerm, searchIsLoading, searchResults, errorMessage}: NavBarProps) {
  const {selectedCity, setSelectedCity} = useCity()
  const {isAuthenticated, user, login, logout, initialized} = useAuth();

  return (
    <Navbar expand='lg' className="bg-body-tertiary shadow-sm">
      <Container>
        <div className="d-flex flex-column">
          <NavLink to="/" className="navbar-brand fw-bold">
            Weather Dashboard
          </NavLink>
          {selectedCity && (
            <div className="d-flex gap-2 align-items-center">
              <small className="text-muted">Selected City:</small>
              <Badge bg="primary">{selectedCity.name}</Badge>
              <CloseButton onClick={() => setSelectedCity(null)} aria-label="Clear selection"></CloseButton>
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
          <div className="d-flex align-items-center gap-3">
            <SearchForm setSearchTerm={setSearchTerm} searchIsLoading={searchIsLoading} searchResults={searchResults} errorMessage={errorMessage}/>
            {initialized && (
              isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-primary" id="user-dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    {user?.preferred_username || user?.name || 'User'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.ItemText>
                      <div className="d-flex flex-column">
                        <small className="text-muted">Signed in as</small>
                        <strong>{user?.email || user?.preferred_username}</strong>
                      </div>
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item as={NavLink} to="/profile">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => logout()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                      </svg>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="primary" onClick={() => login()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                  Login
                </Button>
              )
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
