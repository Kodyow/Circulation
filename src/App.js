import react from "react";
import { Link, Route,Routes,Outlet,NavLink } from 'react-router-dom'
import { Navbar } from "./components/Navbar";
import logo from './resources/logo.png'

export default function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

