import React, { useState } from 'react';
import Axios from 'axios';

function SignIn() {
    const [usernameGet, getUsername] = useState("")
    const [passwordGet, getPassword] = useState("")
    const signin = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/auth/signin", {
            username: usernameGet,
            password: passwordGet,
        }).then((response)=> {
            console.log(response);
        });
    };

    return (
        <div className="container">
            <form onSubmit={signin}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="usernameGet" className="form-label mt-4">Username</label>
                        <input name="username" type="username" className="form-control" id="usernameGet" placeholder="Username" onChange={(e)=>{getUsername(e.target.value)}}/>
                        <label htmlFor="passwordGet" className="form-label mt-4">Password</label>
                        <input name="password" type="password" className="form-control" id="passwordGet" placeholder="Password" onChange={(e)=>{getPassword(e.target.value)}}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </fieldset>
            </form>
        </div>

    );
}

export default SignIn;
