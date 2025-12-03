import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  return(
    <Navbar expand='lg' className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">Weather Dashboard</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/profile" className="nav-link">Profile</NavLink> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
