import React, { Component } from 'react';
import "../LoginPage/LoginPage.css"
import {storage,auth} from "../firebase";

class SignIN extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailId : null,
            password: null
         }
    }

    login=()=>{
        // localStorage.setItem("users","admin");
        // window.location.reload();
        auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                localStorage.setItem("users",JSON.stringify(user));
                window.location.reload();
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    render() { 
        return ( 
        <div>
             <input className="logipage__text" onChange={(event)=>{this.state.emailId=event.currentTarget.value}} type="text" placeholder="Phone number, username, or email" />
             <input className="logipage__text" onChange={(event)=>{this.state.password=event.currentTarget.value}}  type="password" placeholder="Password" />
             <button className="login__button" onClick={this.login}>Log In</button>
        </div> 
    );
    }
}
 
export default SignIN;