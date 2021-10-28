import React from "react";
import "./contactus.css"
import axios from 'axios';

export default class ContactUs extends React.Component {
    state = {
        name: '',
        subject: '',
        email: '',
        message: ''
      }
    constructor(props) {
        super(props);
        this.onEmailChange= this.onEmailChange.bind(this);
        this.onMsgChange= this.onMsgChange.bind(this);
        this.onNameChange= this.onNameChange.bind(this);
        this.onSubjectChange= this.onSubjectChange.bind(this);
        this.submitEmail= this.submitEmail.bind(this);
    }

    
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Contact Us</h2>
                                <p>Let us know what you think! </p><hr/>
                                <form id="contact-form" onSubmit={this.submitEmail}
                                    method="POST">
                                <div className="form-group">
                                <div className="row">
                                <div className="col-md-6">
                                    <input placeholder = "Name"  id="name" type="text" 
                                       className="form-control" required value={this.state.name} 
                                       //onChange={this.onNameChange.bind(this)}/>
                                       onChange= {this.onNameChange}/>
                                </div>
                                <div className="col-md-6">
                                    <input placeholder = "Email"  id="email" type="email"
                                      className="form-control" aria-describedby="emailHelp"
                                      required value={this.state.email} 
                                      //onChange=
                                      //{this.onEmailChange.bind(this)}
                                      onChange= {this.onEmailChange}
                                      />
                                </div>
                                </div>
                                </div>
                                <div className="form-group">
                                    <input placeholder = "Subject"  id="subject" type="text"
                                      className="form-control" required value={this.state.subject}
                                      //onChange={this.onSubjectChange.bind(this)}
                                      onChange= {this.onSubjectChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea placeholder = "Message"  id="message" 
                                       className="form-control" rows="1" 
                                       required value={this.state.message}
                                      //onChange= {this.onMsgChange.bind(this)}
                                      onChange={this.onMsgChange}/>
                                </div>
                                <button className= "button" type="submit" id="button" >Submit</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

    

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }

    onMsgChange(event) {
        this.setState({message: event.target.value})
    }

    submitEmail(e){
        console.log('submitting');
        e.preventDefault();
        axios({
          method: "POST", 
          url:"http://localhost:4000/contact_us", 
          data:  this.state
        }).then((response)=>{
          if (response.data.status === 'success'){
              alert("Message Sent."); 
              this.resetForm()
          }else if(response.data.status === 'fail'){
              alert("Message failed to send.")
          }
        })
    }

    resetForm(){
        this.setState({name: '', email: '',subject:'', message: ''})
    }
    
}
