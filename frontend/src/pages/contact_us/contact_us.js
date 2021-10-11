import React from "react";
import "./contactus.css"

export default class ContactUs extends React.Component {
    render() {
        return (
            <div className="body">
                <p>Contact Us</p>
                <div className="info">
                    We would like to hear from you!
                    <br></br>
                    <a href={"mailto:" + this.props.email}>oerspan@usc.edu</a>
                </div>
                
            </div>
        
            

        );
    }
}
