import { Route,Routes,Outlet,NavLink } from 'react-router-dom'
import { Groups } from "./Groups";
import Register from "./Register";
import Calendar from "./calendarapp"
//import Home from "../index"
import circulation from '../resources/circulation.png'
import logo from '../resources/logo.png'
import './Nav.css'
import SignIn from "./SignIn";
import { Card } from './Card'


export const Navbar = () => {
    return (
        <div className="App">
            <div>
                  <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="groups" element={<Groups />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="about" element={<About />} />
                            <Route path="signin" element={<SignIn />} />
                            <Route path="register" element={<Register />} />
                        </Route>
                  </Routes>
            </div>
            
        </div>
      );
}


function Layout() {
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <img src={logo} alt="logo" width="80rem" height="50rem"/>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/groups">Groups</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                    </li>
                    <li className="nav-item">  
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    {/*
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu show">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                    </li>
                    */
                    }

                </ul>
              
            </div>
            <div className="sign-link">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signin">Sign in</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>

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
            <img src={circulation} alt="Several individual people along with technology 
            and all seven continents behind the logo for Circulation." style = {{width: "75%", marginTop: "1%", marginLeft: "13%"}}/>

            <div class={`my-card card text-white bg-secondary mb-3`} style = {{width: "82.5%", height: "20%", marginLeft: "8%"}}>
                <div class="card-header"></div>
                <div class="card-body">
                    <h4 class="card-title">Welcome to Circulation!</h4>
                    <p class="card-text">Circulation is a way for you to connect with other people based on interests and help you 
                        with your schedule both with attending and scheduling events.</p>
                </div>
            </div>
                
            <div>
                <div class={`my-card card text-white bg-secondary mb-3`} style = {{width: "21.65%", height: "10%", marginLeft: "8%"}}>
                    <div class="card-header"></div>
                    <div class="card-body">
                        <h4 class="card-title">Dino Jazvin</h4>
                        <p class="card-text">email: dinojaz@uw.edu</p>
                    </div>
                </div>
                <div class={`my-card card text-white bg-secondary mb-3`} style = {{width: "21.65%", height: "10%", marginLeft: "8%"}}>
                    <div class="card-header"></div>
                    <div class="card-body">
                        <h4 class="card-title">Elisabeth Jewett</h4>
                        <p class="card-text">email: elisaj3@uw.edu</p>
                    </div>
                </div>
                <div class={`my-card card text-white bg-secondary mb-3`} style = {{width: "21.65%", height: "10%", marginLeft: "8%"}}>
                    <div class="card-header"></div>
                    <div class="card-body">
                        <h4 class="card-title">Kody Okakura Williams</h4>
                        <p class="card-text">email: kodyow@uw.edu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function About() {
    return (
        <div>
             <div class={`my-card card text-white bg-secondary mb-3`} style = {{width: "80%", height: "20%", marginLeft: "10.5%"}}>
                <div class="card-header"></div>
                <div class="card-body">
                    <h4 class="card-title">Welcome to Circulation!</h4>
                    <p class="card-text">Circulation is a way for you to connect with other people based on interests and help you
                         with your schedule both with attending and scheduling events.</p>
                    <p class="card-text">Through Circulation, you will be able to see when events you want to attend
                         or host will overlap or clash with each other.</p>
                </div>
            </div>
        </div>
    );
}
