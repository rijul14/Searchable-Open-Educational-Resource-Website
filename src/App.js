import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home/home";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

function App() {
    const history = useHistory();

    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path="/login">
                        {/* <Login/> */}
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
