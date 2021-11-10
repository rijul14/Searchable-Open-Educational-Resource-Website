import React from "react";
import "./search.css";
import Result from "../../components/result/result"
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Category from "../../components/search/category";

export default class Home extends React.Component {
  constructor(props) {
    // dummy data
    super(props);

    this.state = {
      searchResults: [],
      searchQuery: "",
      level: "",
      skills: "",
      results_per_page: 5,
      page: 0,
    }

    this.changePage = this.changePage.bind(this);
    console.log("init");
  }

  queryData = async (query) => {
    const search_endpoint = "https://d8i85sam75.execute-api.us-west-2.amazonaws.com/Prod/search";
    console.log("Searching with", query)
    await fetch(search_endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'}, // not using json to avoid CORS preflight
      body: JSON.stringify(query),
    }).then(response => response.json())
      .then(resp => {
        console.log(`Got ${resp.length} results for query ${query}`);
        this.setState({searchResults: resp});
      })
      .catch(error => console.error(`Error searching with query ${query}`, error));
  }

  async componentDidMount() {
    console.log("Running")
    await this.queryData({q: ""});
  }

  setSearchQuery = (e) => {
    this.setState({searchQuery: e.target.value});
  }

  setSearchTechnologyUsed = (e) => {
    if(e === "Formulario de Google") {
      e = "Google Form"
    }
    this.setState({technology_used: e});
  }

  setSearchLevel = (e) => {
    this.setState({level: e});
  }

  setSearchSkills = (e) => {
    this.setState({skills: e});
  }

  changePage = (event, value) => {
    this.setState({page: value - 1});
  };

  startSearch = (e) => {
    // TODO(Sakura): Support multiple of the same options
    let query = {
      q: this.state.searchQuery,
      technology_used: this.state.technology_used,
      level: this.state.level,
      skills: this.state.skills,
    }

    if(this.state.technology_used === "") {
      delete query.technology_used;
    } if(this.state.level === "") {
      delete query.level;
    } if(this.state.skills === "") {
      delete query.skills;
    }

    this.queryData(query);
  }

  checkEnter = (e) => {
    if (e.keyCode === 13){
      this.startSearch();
    }
  }

  render() {
    return (
      <div className="h-100">
        <Grid className="h-100" container spacing={2}>
          <Grid item xs={3}>
            <div className="p-4 h-100">
              <div className="searchBar">
                <input value={this.state.searchQuery} onChange={this.setSearchQuery} placeholder={"Search keywords..."} onKeyDown={this.checkEnter}/>
                <button onClick={this.startSearch} className="btn btn-primary searchButton">Search</button>
              </div>
              <Category onChange={this.setSearchTechnologyUsed} category="Tecnología" options={["Video", "Peardeck", "Formulario de Google", "Quizlet"]}/>
              <Category onChange={this.setSearchLevel} category="Nivel"
  options={["Spanish Level 1- BÁSICO", "Spanish Level 2- INTERMEDIO", "Spanish Level 3- AVANZADO"]}/>
              <Category onChange={this.setSearchSkills} category="Destrezas"
  options={["Comprensión auditiva", "Conversación", "Escritura", "Lectura"]}/>
             </div>
          </Grid>
          <Grid item xs={9}>
            <div className="p-4 bg-light h-100">
              {this.state.searchResults.slice(this.state.results_per_page * this.state.page, this.state.results_per_page * this.state.page + this.state.results_per_page).map((data, index) =>
                <Result key={index} data={data}/>)}
              <Pagination count={parseInt(this.state.searchResults.length / this.state.results_per_page)}
                          color="standard" onChange={this.changePage}/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
