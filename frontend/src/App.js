import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
    Redirect
} from "react-router-dom";

function App() {
    const history = useHistory();

    return (
        <div className="App">
            <Header />
            <Router history={history}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                                    Home
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
                <div className="mh-100 h-100">
                    <Switch>
                        <Route path={"/home"} component={Home}></Route>
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
                        <Route exact path={"/"}>
                            <Redirect to={"/home"} />;
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
