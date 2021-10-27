import React from "react";
import "./search.css";
import Result from "../../components/result/result"
import Grid from "@mui/material/Grid";
import Category from "../../components/search/category";

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
                        <div className="p-4 h-100">
                        <div className="searchBar">
                            <input placeholder={"Search keywords..."}></input>
                            <button className="btn btn-primary">Search</button>
                        </div>
                            {/* form with a checklist */}
                            <Category category="Tecnología" options={["Video", "Peardeck", "Google Form", "Quizlet"]}></Category>
                            <Category category="Nivel" options={["Spanish Level 1- BÁSICO", "Spanish Level 2- INTERMEDIO", "Spanish Level 3- AVANZADO"]}></Category>
                            <Category category="Destrezas" options={["Comprensión auditiva", "Comprensión de textos", "Comprensión de palabras", "Comprensión de frases", "Comprensión de oraciones"]}></Category>
                            <Category category="Gramática" options={["Verbos", "Adjetivos", "Sustantivos", "Adverbios", "Preposiciones"]}></Category>
                            <Category category="Vocabulario" options={["Materiales de clase", "Acciones habituales en un día de clase", "Acciones habituales en un día de clase", "Acciones habituales en un día de clase", "Acciones habituales en un día de clase"]}></Category>
                        </div>
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