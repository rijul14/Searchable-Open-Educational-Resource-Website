import React from "react";
import "./home.css";
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
                            {/* Dummy data */}
                            <Result data={this.data}/>
                            <Result data={this.data}/>
                            <Result data={this.data}/>
                            <Result data={this.data}/>
                            <Result data={this.data}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
