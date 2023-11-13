import React, {useEffect, useState} from 'react'
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/home";
import ContactUs from "./pages/contact_us/contact_us";
import About from "./pages/about/about";
import Header from "./components/header/header";
import Search from "./pages/search/search";
import Footer from "./components/footer/footer";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import {BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory,} from "react-router-dom";


function App() {
    const history = useHistory();

    useEffect(() => {
        document.title = "Oerinspanish"
      }, [])

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleClose = () => setShowLoginModal(false);
    const handleShow = () => setShowLoginModal(true);

    return (
        <div className="App">
            <Header />
            <Router history={history}>
                <Navbar collapseOnSelect expand="lg" class="navbar">
                    <Container>
                        {/* <Navbar.Brand
                            className="logo"
                            as={Link}
                            to={"/home"}
                            style={{ marginLeft: "100px", fontSize: "15pt" }}
                        >
                            oerinspanish
                        </Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/home"}>
                                    oerinspanish
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to={"/home"}>
                                    principal
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/search"}>
                                    buscar
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/about"}>
                                    ¿quiénes somos?
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/contact_us"}>
                                    contacto
                                </Nav.Link>
                                <Nav.Link onClick={handleShow}>
                                    <i className="fas fa-user"></i> Login
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                        <Modal show={showLoginModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicUser">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Enter username" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger">
                                    Login
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>

                </Navbar>
                <div className="content">
                    <Switch>
                        <Route path={"/home"} component={Home}></Route>
                        <Route path={"/search"} component={Search}></Route>
                        <Route
                            path={"/contact_us"}
                            component={ContactUs}
                        ></Route>
                        <Route path={"/about"} component={About}></Route>
                        <Route exact path={"/"}>
                            <Redirect to={"/home"} />;
                        </Route>
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>

    );
}

export default App;
