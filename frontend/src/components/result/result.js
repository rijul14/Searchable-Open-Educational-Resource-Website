import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const styles = {
    card: {
        minWidth: 275,
        margin: '1rem',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
        },
    },
    column: {
        flex: '1',
        paddingRight: '1rem',
        textAlign: 'left',
        '@media (max-width: 600px)': {
            paddingRight: '0',
        },
    },
    title: {
        fontSize: '1.5rem',
        '@media (max-width: 600px)': {
            fontSize: '1rem',
        },
    },
    secondaryText: {
        fontSize: '1rem',
        '@media (max-width: 600px)': {
            fontSize: '0.8rem',
        },
    },
    bodyText: {
        fontSize: '0.9rem',
        '@media (max-width: 600px)': {
            fontSize: '0.75rem',
        },
    },
};


export default class Result extends React.Component {
    render() {
        return (
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    {/* First Column */}
                    <div style={styles.column}>
                        <Typography variant="h5" component="div" sx={styles.title}>
                            {this.props.data.title}
                        </Typography>
                        <Typography sx={styles.secondaryText} color="text.secondary">
                            {this.props.data.level}
                        </Typography>
                        <Button href={this.props.data.location} target="_blank">
                            Link to {this.props.data.technology_used}
                        </Button>
                    </div>

                    {/* Second Column */}
                    <div style={styles.column}>
                        <Typography variant="body2" sx={styles.bodyText}>
                            <strong>Vocabulario:</strong> {this.props.data.vocabulary}
                        </Typography>
                        <Typography variant="body2" sx={styles.bodyText}>
                            <strong>Gramática</strong>: {this.props.data.grammar}
                        </Typography>
                        <Typography variant="body2" sx={styles.bodyText}>
                            <strong>Habilidades:</strong> {this.props.data.skills}
                        </Typography>
                        <Typography variant="body2" sx={styles.bodyText}>
                            <strong>Autor:</strong> {this.props.data.author}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
