import React from 'react'
import {
  BrowserRouter as Router }
  from "react-router-dom";
  import { Navbar,Nav } from 'react-bootstrap'


class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">HandsOn Connect</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Calendar</Nav.Link>
                                    <Nav.Link href="/about-us">Reports</Nav.Link>
                                    <Nav.Link href="/contact-us">Status</Nav.Link>
                                    </Nav>
                                    <Nav className="ml-auto">
                                      <Nav.Link href="/">Settings</Nav.Link>
                                      <Nav.Link href="/">About Us</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

export default BootstrapNavbar;
