import { Link } from 'react-router-dom';

import { Navbar, Container, Nav } from 'react-bootstrap';
const NavBar = ({ user, handleSignout }) => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          {user ? (
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#features">Booking</Nav.Link>
              <Nav.Link href="#pricing">About us</Nav.Link>
              <Nav.Link onClick={handleSignout} href="">Sign Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

