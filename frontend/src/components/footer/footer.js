import React from "react";
import "./footer.css";
import DornsifeLogo from './DornsifeLogo.png';
import CC from './cc.png';


export default class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className = "row footer flex-nowrap">
                    <div className="col onee">
                        <img src={DornsifeLogo} alt="logo"/>
                    </div>
                    <div className = "col twwo">
                        <img src={CC} alt="cc"/>
                    </div>   
                </div>
                <div className="copyRight">
                    Copyright @ 2021 www.oerinspanish.usc.edu. All rights reserved.
                </div>
            </div>

        
        );}
}
