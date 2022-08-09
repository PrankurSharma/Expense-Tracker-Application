import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import { baseUrl } from "./baseUrl";

function Header({ user_id, user_name }) {
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const logout = () => {
        Axios.get(baseUrl + "/api/logout").then((response) => {
            alert("Please click OK to proceed logging out.");
            navigateToLogin();
        });
    }
    return (
        <div className="divhead">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src='/logo.png' alt="Finer" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link> 
                                Transactions This Month 
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/alltransactions">
                            <Nav.Link>
                                All Transactions
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/filtertransactions">
                            <Nav.Link> 
                                Filter Transactions 
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                    <NavDropdown title="Account Information">
                        <NavDropdown.Item disabled> {user_name} : {user_id} </NavDropdown.Item>
                        <LinkContainer to="/changepassword">
                            <NavDropdown.Item> Change Password </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={() => {
                            logout();
                        }}> Logout </NavDropdown.Item>
                  </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
        </div>
    );
}
export default Header;