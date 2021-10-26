import React from "react";
import "./header.css"
import USClogo from './USClogo.png';
export default class Header extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <div class = "row flex-nowrap">
                    <div class="col oone">
                         <p>
                        Departamento de Culturas Latinoamericano e Ibéricas <br />
                        Programa básico de lengua española<br />
                        oerin.spanish@usc.edu<br />
                        </p>
                    </div>
                    <div class="col twoo">
                    <img src={USClogo} alt="logo"height={150}/>
                    </div>
                </div>
            </div>

        
        );}
}
