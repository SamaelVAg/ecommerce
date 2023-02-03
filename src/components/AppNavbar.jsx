import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

const AppNavbar = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <Navbar bg="primary" variant="dark" expand="lg" size="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/purchases'>Purchases</Nav.Link>
                            <Nav.Link onClick={() => handleShow()}>Cart</Nav.Link>
                            {localStorage.getItem('token') ?
                                (<Nav.Link onClick={() => logout()}>Log Out</Nav.Link>) :
                                (<Nav.Link as={Link} to='/login'>Log In</Nav.Link>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose}></Cart>
        </div>
    );
};

export default AppNavbar;