import React from "react";
import "./contactus.css"

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          message: ''
        }
    }
    handleSubmit(e) {
        e.preventDefault();
      
        fetch('http://localhost:3002/send', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(
          (response) => (response.json())
            ).then((response)=> {
          if (response.status === 'success') {
            alert("Message Sent.");
            this.resetForm()
          } else if(response.status === 'fail') {
            alert("Message failed to send.")
          }
        })
      }
    
    resetForm(){
        this.setState({name: "", email: "", message: ""})
    }
    render() {
        return (
            <div className="body">
                <p>Contact Us</p>
                <div className="info">
                    We would like to hear from you!
                    <br></br>
                    <a href={"mailto:" + this.props.email}>oerspan@usc.edu</a>
                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                
            </div>
        
            

        );
    }

    isValidEmail(email) {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
      }

    onNameChange(event) {
        this.setState({name: event.target.value})
      }
    
      onEmailChange(event) {
        this.setState({email: event.target.value})
      }
    
      onMessageChange(event) {
        this.setState({message: event.target.value})
      }
    
}
