import React from "react";
import "./home.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
    BrowserRouter as Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";

function Home(props) {
    const { path } = useRouteMatch();

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand
                        className="logo"
                        as={Link}
                        to={path}
                        style={{ marginLeft: "100px", fontSize: "15pt" }}
                    >
                        oerinspanish
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/home/page1"}>
                                Page 1
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/home/page2"}>
                                Page 2
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/home/page3"}>
                                Page 3
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={"/home/page4"}>
                                Page 4
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/home/page5"}>
                                Page 5
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="main-content">
                <Switch>
                    <Route
                        path={"/home/page1"}
                        // component={Component}
                    ></Route>

                    <Route
                        path={"/home/page2"}
                        // component={Component}
                    ></Route>
                    <Route
                        path={"/home/page3"}
                        // component={Component}
                    ></Route>
                    <Route
                        path={"/home/page4"}
                        // component={Component}
                    ></Route>
                    <Route
                        path={"/home/page5"}
                        // component={Component}
                    ></Route>
                </Switch>
            </div>
        </div>
    );
}

export default Home;
