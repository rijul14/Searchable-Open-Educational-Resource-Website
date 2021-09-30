import React from "react";
import "./home.css";
import Grid from "@mui/material/Grid";

export default class Home extends React.Component {
    render() {
        return (
            <div className="h-100">
                <Grid className="h-100" container spacing={2}>
                    <Grid item xs={3}>
                        <div className="p-4 h-100">Search here</div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="p-4 bg-light h-100">Content here</div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
