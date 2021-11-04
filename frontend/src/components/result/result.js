import React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default class Result extends React.Component {
    render() {
        return (
            <Card sx={{ minWidth: 275 }} className="m-4">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {this.props.data.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {this.props.data.level}
                    </Typography>
                    <Typography variant="body2">
                        Vocabulary: {this.props.data.vocabulary}
                    </Typography>
                    <Typography variant="body2" className="pt-2">
                        Grammar: {this.props.data.grammar}
                    </Typography>
                    <Typography variant="body2" className="pt-2">
                        Skills: {this.props.data.skills}
                    </Typography>
                    <Typography variant="body2" className="pt-2">
                        Author: {this.props.data.author}
                    </Typography>
                    <Button target="_blank" href={this.props.data.location}>Link to {this.props.data.technology_used}</Button>
                </CardContent>
            </Card>
        );
    }
}
