import React, {useEffect, useState} from 'react'
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/home";
import ContactUs from "./pages/contact_us/contact_us";
import About from "./pages/about/about";
import Search from "./pages/search/search";
import Footer from "./components/footer/footer";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory, } from "react-router-dom";
import Logo from "./components/logo/logo";

// Global variables 
var user_name = "";
var pass_word = "";
var loggedin = false;

function App() {

    const history = useHistory();

    useEffect(() => {
        document.title = "Oerinspanish"
    }, [])

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleClose = () => setShowLoginModal(false);
    const handleShow  = () => setShowLoginModal(true);

    // If credentials are valid then log in user and stop showing login window
    // else stay in log in window
    const handleLogIn = () => {
        console.log(user_name);
        console.log(pass_word);

        if (user_name === "user_name" && pass_word === "password") {
            alert("LOG IN SUCCESSFUL");
            loggedin = true;
            setShowLoginModal(false);
        }
        else {
            alert("INVALID CREDENTIALS");
        }
    }

    // Logging out hides log out button/makes log in button appear and refershes window
    const handleLogOut = () => {
        loggedin = false;
        alert("LOGGING OUT");
        window.location.reload(false);
    }

    const nameChange = (event) => { user_name = event.target.value; }   // updates username var on change
    const passChange = (event) => { pass_word = event.target.value; }   // updates password var on chance

    // Checks for `Enter` press when Log In window is open
    useEffect(() => {
        const keyDownHandler = event => {
            console.log('User pressed: ', event.key);
        
            if (event.key === 'Enter' && showLoginModal === true) {
                handleLogIn();
            }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [showLoginModal]);

    return (
        <div className="App">
            <Router history={history}>
                <Navbar justify collapseOnSelect expand="lg" variant="dark" class="navbar" style={{ backgroundColor: "rgb(120, 26, 15)", flexWrap: "wrap" }}>
                    <Container className="mx-2 border-bottom" fluid>
                        <Navbar.Brand as={Link} to={"/home"} className="me-auto aFont" class="align-content-start">Oerinspanish</Navbar.Brand>
                        <Navbar.Brand as={Link} to={"/home"} className="ms-2">
                            <Logo />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" class="align-content-end" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="ml-auto">
                            <Nav className="ms-auto">

                                {loggedin === true ?
                                    <span>
                                        Welcome {user_name}
                                    </span>
                                : null}

                                <Nav.Link as={Link} to={"/search"}>
                                    buscar
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/about"}>
                                    ¿quiénes somos?
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/contact_us"}>
                                    contacto
                                </Nav.Link>

                                {/* if user is not logged in show login button */}
                                {loggedin === false ?
                                    <Nav.Link onClick={handleShow}>
                                        <i className="fas fa-user"></i> Login
                                    </Nav.Link>
                                :null}

                                {/* if user is logged in show log out button */}
                                {loggedin === true ?
                                    <Nav.Link onClick={handleLogOut}>
                                        <i className="fas fa-user"></i> Logout
                                    </Nav.Link>
                                : null}

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
                                        <Form.Control type="username" onChange={nameChange} name="userName" placeholder="Enter username" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" onChange={passChange} name="passWord" placeholder="Password" />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={handleLogIn}>
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
        </div >

    );
}

export default App;
