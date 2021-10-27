import React from "react";
import "./footer.css";
import DornsifeLogo from './DornsifeLogo.png';
import CC from './cc.png';


export default class Footer extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <div class = "row footer flex-nowrap">
                    <div class="col onee">
                        <img src={DornsifeLogo} alt="logo"height={90}/>
                    </div>
                    <div class = "col twwo">
                        <img src={CC} alt="cc"height={60}/>
                    </div>
                    
                </div>
            </div>

        
        );}
}
