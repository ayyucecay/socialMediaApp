import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { AuthContext } from '../context/auth';
 
function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substring(1);
    const [active, setActive] = useState(path);

    const menuBar = user ? (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Hi World!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
            <Nav 
            className="container-fluid"
            activeKey={active}
            onSelect={(selectedKey) => setActive(selectedKey)}
            >   <Nav.Item as={Link} to="/">
                    <Nav.Link eventKey="home" href="/">{user.username}</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ms-auto" onClick={logout}>
                    <Nav.Link eventKey="logout">Log Out</Nav.Link>        
                </Nav.Item>
            </Nav>
      </Container>
    </Navbar>

    ) : (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Hi World!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
            <Nav 
            className="container-fluid"
            activeKey={active}
            onSelect={(selectedKey) => setActive(selectedKey)}
            >   <Nav.Item as={Link} to="/">
                    <Nav.Link eventKey="home" href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ms-auto" as={Link} to="/login">
                    <Nav.Link eventKey="login" href="/login">Login</Nav.Link>        
                </Nav.Item>
                <Nav.Item as={Link} to="/register">
                    <Nav.Link eventKey="register" href="/register">Register</Nav.Link>
                </Nav.Item>
            </Nav>
      </Container>
    </Navbar>
    )

    return menuBar;
}

export default MenuBar;