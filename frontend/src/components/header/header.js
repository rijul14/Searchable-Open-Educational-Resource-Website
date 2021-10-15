import React from "react";
import "./header.css"
import USClogo from './USClogo.png';
export default class Header extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <div class = "row flex-nowrap">
                    <div class="col one">
                    <img src={USClogo} alt="logo"height={150}/>
                    </div>
                </div>
            </div>

        
        );}
}
