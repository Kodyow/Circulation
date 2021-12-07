import React, { useState } from 'react';
import Axios from 'axios';

function Register() {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [phoneReg, setPhoneReg] = useState("")
    const register = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/auth/register", {
            username: usernameReg,
            password: passwordReg,
            email: emailReg,
            phone: phoneReg,
        }).then((response)=> {
            console.log(response);
        });
    };

    return (
        <div className="container">
            <form onSubmit={register}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="usernameReg" className="form-label mt-4">Username</label>
                        <input name="username" type="username" className="form-control" id="usernameReg" placeholder="Username" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
                        <label htmlFor="passwordReg" className="form-label mt-4">Password</label>
                        <input name="password" type="password" className="form-control" id="passwordReg" placeholder="Password" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                        <label htmlFor="emailReg" className="form-label mt-4">Email</label>
                        <input name="email" type="email" className="form-control" id="emailReg" placeholder="Email" onChange={(e)=>{setEmailReg(e.target.value)}}/>
                        <label htmlFor="phoneReg" className="form-label mt-4">Phone Number</label>
                        <input name="phoneReg" type="phone" className="form-control" id="phoneReg" placeholder="Phone Number" onChange={(e)=>{setPhoneReg(e.target.value)}}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </fieldset>
            </form>
        </div>

    );
}

export default Register;
