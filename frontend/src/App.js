import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/home";
import ContactUs from "./pages/contact_us/contact_us";
import About from "./pages/about/about";
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
    Redirect,
} from "react-router-dom";

function App() {
    const history = useHistory();

    return (
        <div className="App">
            <Header />
            <Router history={history}>
                <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" class="navbar">
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
                                <Nav.Link as={Link} to={"/about"}>
                                    about us
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/contact_us"}>
                                    contact us
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="mh-100 h-100">
                    <Switch>
                        <Route path={"/home"} component={Home}></Route>
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
        </div>
    );
}

export default App;
