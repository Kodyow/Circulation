import react from "react";
import { Link, Route,Routes,Outlet,NavLink } from 'react-router-dom'
import { Groups } from "./Groups";
import logo from '../resources/logo.png'


export const Navbar = () => {
    return (
        <div className="App">
            <div>
                  <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="groups" element={<Groups />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="about" element={<About />} />
                        </Route>
                  </Routes>
            </div>
            
        </div>
      );
}


function Layout() {
    return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <img src={logo} alt="logo" width="80rem" height="50rem"/>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                <NavLink className="nav-link" to="/" >Home</NavLink>
                </li>
                <li class="nav-item">
                <NavLink className="nav-link" to="/groups">Groups</NavLink>
                </li>
                <li class="nav-item">
                <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                </li>
                <li class="nav-item">  
                <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                {/*
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu show">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
                </li>
                */
                }

            </ul>
            </div>
        </div>
        </nav>
        <Outlet />
    </div>
    );    
}

function Home() {
    return (
        <div>
        </div>
    );
}

function Pricing() {
    return (
        <div>
        </div>
    );
}
function About() {
    return (
        <div>
        </div>
    );
}
  

