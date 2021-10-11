import React from "react";
import "./header.css"
import DornsifeLogo from './DornsifeLogo.png';
import Shield from './Shield.png'
export default class Header extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <div class = "row flex-nowrap">
                    <div class="col one">
                    <img src={DornsifeLogo} alt="logo"height={150}/>
                    </div>
                    <div class="col two">
                    <img src={Shield} alt="shield" height={250}/>
                    </div>
                </div>
            </div>

        
        );}
}
