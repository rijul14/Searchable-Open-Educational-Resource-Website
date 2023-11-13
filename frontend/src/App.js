import React, { useEffect } from 'react'
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/home";
import ContactUs from "./pages/contact_us/contact_us";
import About from "./pages/about/about";
import Search from "./pages/search/search";
import Footer from "./components/footer/footer";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory, } from "react-router-dom";
import Logo from "./components/logo/logo";

function App() {
    const history = useHistory();

    useEffect(() => {
        document.title = "Oerinspanish"
    }, [])

    return (
        <div className="App">
            <Router history={history}>
                <Navbar justify collapseOnSelect expand="lg" variant="dark" class="navbar" style={{ backgroundColor: "rgb(120, 26, 15)", flexWrap: "wrap" }}>
                    <Container className="mx-2 border-bottom" fluid>
                        <Navbar.Brand as={Link} to={"/home"} className="text-white me-auto"  class="align-content-start">Oerinspanish</Navbar.Brand>
                        <Navbar.Brand as={Link} to={"/home"} className="ms-2">
                            <Logo />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" class="align-content-end" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="ml-auto">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to={"/search"}>
                                    buscar
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/about"}>
                                    ¿quiénes somos?
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/contact_us"}>
                                    contacto
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
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
        </div >

    );
}

export default App;
