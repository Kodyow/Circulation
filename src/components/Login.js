import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:5000/auth/login", {
            username: username,
            password: password,
        }).then((response)=> {
            console.log(response);
            if (response) {
                navigate('/');
                window.location.reload(true);
            }
        });

    };

    return (
        <div className="container">
            <form onSubmit={login}>
                <fieldset>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="usernameLog" className="form-label mt-4">Username</label>
                        <input name="usernameLog" type="username" className="form-control" id="usernameLog" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                        <label htmlFor="passwordLog" className="form-label mt-4">Password</label>
                        <input name="passwordLog" type="password" className="form-control" id="passwordLog" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </fieldset>
            </form>
        </div>

    );
}

export default Login;
