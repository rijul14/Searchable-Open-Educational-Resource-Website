import React from "react";
import "./footer.css";
import DornsifeLogo from './DornsifeLogo.png';


export default class Footer extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <div class = "row flex-nowrap">
                    <div class="col onee">
                        <img src={DornsifeLogo} alt="logo"height={90}/>
                    </div>
                    <div class="col two">
                        {/* <p>
                        Department of Latin American and Iberian Cultures <br />
                        Taper Hall of Humanities 156<br />
                        (213) 740 - 1258<br />
                        laicdept@usc.edu<br />
                        </p> */}
                    </div>
                    
                </div>
            </div>

        
        );}
}
