import React from "react";
import "./search.css";
import Result from "../../components/result/result"
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Category from "../../components/search/category";
import qs from "qs";

export default class Home extends React.Component {
  constructor(props) {
    // dummy data
    super(props);

    const qParam = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).q;
    this.state = {
      searchResults: [],
      searchQuery: qParam,
      results_per_page: 5,
      page: 0,
    }

    this.changePage = this.changePage.bind(this);

    console.log("init", `qparam: ${qParam}`);
  }

  queryData = async (query) => {
    const search_endpoint = "https://75vsbghrpd.execute-api.us-west-2.amazonaws.com/Prod/search";
    console.log("Searching with", query)
    await fetch(search_endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'}, // not using json to avoid CORS preflight
      body: JSON.stringify(query),
    }).then(response => response.json())
      .then(resp => {
        if (typeof resp.length === "undefined") throw EvalError("Invalid result from the server");
        console.log(`Got ${resp.length} results for query ${query}`);
        this.setState({searchResults: resp});
      })
      .catch(error => console.error(`Error searching with query ${query}`, error));
  }

  async componentDidMount() {
    console.log("Running")
    // await this.queryData({q: ""});
    this.startSearch();
  }

  setSearchQuery = (e) => {
    this.setState({searchQuery: e.target.value});
  }

  setMultiFieldState = state => {
    const newState = {};
    const checked = state.checked;
    delete state.checked;
    const [field, val] = Object.entries(state)[0];
    let oldVal = this.state[field];
    if (checked) { // add
      if (typeof oldVal !== "undefined") {
        if (typeof oldVal === 'string') oldVal = [oldVal];
        newState[field] = oldVal.concat(val);
      } else {
        newState[field] = val;
      }
    } else if (typeof oldVal !== "undefined") { // remove
      if (!Array.isArray(oldVal)) newState[field] = undefined;
      else {
        const idx = oldVal.indexOf(val);
        if (idx !== -1) oldVal.splice(idx, 1);
        if (oldVal.length === 1) oldVal = oldVal[0];
        newState[field] = oldVal;
      }
    } else { // shouldn't happen, but do it anyways :)
      delete newState[field];
    }
    console.log("Set multi field state", newState, {...state, checked: checked});
    this.setState(newState);
  }

  setSearchTechnologyUsed = (e, checked) => {
    if (e === "Formulario de Google") {
      e = "Google Form"
    }
    this.setMultiFieldState({technology_used: e, checked: checked});
  }

  setSearchLevel = (e, checked) => {
    this.setMultiFieldState({level: e, checked: checked});
  }

  setSearchSkills = (e, checked) => {
    this.setMultiFieldState({skills: e, checked: checked});
  }

  changePage = (event, value) => {
    this.setState({page: value - 1});
  };

  startSearch = () => {
    this.props.history.push(`/search?q=${this.state.searchQuery}`);
    let query = {
      q: this.state.searchQuery,
      technology_used: this.state.technology_used,
      level: this.state.level,
      skills: this.state.skills,
    }

    if (this.state.technology_used === "") {
      delete query.technology_used;
    }
    if (this.state.level === "") {
      delete query.level;
    }
    if (this.state.skills === "") {
      delete query.skills;
    }

    this.queryData(query);
  }

  checkEnter = (e) => {
    if (e.keyCode === 13) {
      this.startSearch();
    }
  }

  render() {
    return (
      <div className="h-100">
        <Grid className="h-100" container spacing={1}>
          <Grid item xs={3} style={{minWidth: "300px"}}>
            <div className="p-2 h-100">
              <div className="searchBar">
                <input value={this.state.searchQuery} onChange={this.setSearchQuery} placeholder={"Search keywords..."}
                       onKeyDown={this.checkEnter}/>
                <button onClick={this.startSearch} className="btn btn-primary searchButton">Search</button>
              </div>
              <Category onChange={this.setSearchTechnologyUsed} category="Tecnología"
                        options={["Video", "Peardeck", "Formulario de Google", "Quizlet"]}/>
              <Category onChange={this.setSearchLevel} category="Nivel"
                        options={["Spanish Level 1- BÁSICO", "Spanish Level 2- INTERMEDIO", "Spanish Level 3- AVANZADO"]}/>
              <Category onChange={this.setSearchSkills} category="Destrezas"
                        options={["Comprensión auditiva", "Conversación", "Escritura", "Lectura"]}/>
            </div>
          </Grid>
          <Grid item xs={9}>
            {/* bg-light */}
            <div className="p-2 h-100">
              {this.state.searchResults.length > 0 ? (this.state.searchResults.slice(this.state.results_per_page * this.state.page, this.state.results_per_page * this.state.page + this.state.results_per_page).map((data, index) =>
                  <Result key={index} data={data}/>)) : (<div>No se han encontrado resultados</div>) // empty result
              }
              <Pagination count={parseInt(this.state.searchResults.length / this.state.results_per_page)}
                          color="standard" onChange={this.changePage}/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
