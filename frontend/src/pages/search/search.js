import React from "react";
import "./search.css";
import Result from "../../components/result/result"
import Grid from "@mui/material/Grid";

export default class Home extends React.Component {
    constructor(props) {
      // dummy data
      super(props);
      this.data = {
          "title": "Carlos va a la escuela",
          "level": "Spanish Level 1- BÁSICO",
          "author": "Myra Moghal",
          "video": "https://drive.google.com/file/d/1n74-mfYe7Y5r7P7pKSTQcxDvy0_zt5tI/view?usp=sharing",
          "type": "video",
          "vocabulary": "Materiales de clase, Acciones habituales en un día de clase",
          "skills": "Comprensión auditiva"
      }

      this.state = {
        searchResults: []
      }

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
        console.log(`Got ${resp.length} results for query ${query}`)
        this.setState({searchResults: resp})
      })
      .catch(error => console.error(`Error searching with query ${query}`, error));
  }

    async componentDidMount() {
      console.log("Running")
      await this.queryData({q: "", limit: "10"});
    }

    render() {
        return (
            <div className="h-100">
                <Grid className="h-100" container spacing={2}>
                    <Grid item xs={3}>
                        <div className="p-4 h-100">Search here</div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="p-4 bg-light h-100">
                            <Result data={this.data}/>
                            {this.state.searchResults.map((data) => <Result data={data}/>)}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
