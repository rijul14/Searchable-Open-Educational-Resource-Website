import React from "react";
import "./home.css";
import mainPhoto from './mainPhoto.jpg';


export default class Home extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <div class = "row body flex-nowrap">
                    <div class="bg-image">
                    </div>
                    <div class="bg-text">
                        <div class="title" >
                        Oerinspanish <br/>
                        </div>
                        Recursos educativos de acceso libre <br/>
                        para la enseñanza del español <br/> <br/> <br/>
                        <div class="search" >
                        búsqueda<br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
