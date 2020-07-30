// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../stylesheets/navbar.scss"

const NavBar = () => {
  const history = useHistory();

  if (localStorage.getItem("token") !== null) {
    return (
      <nav>
        <div className="nav-title-wrapper"><h1>WishUpon...</h1></div>
        <div className="nav-spaceholder"></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/wishes">Wishes</Link>
          <Link to="/wishes/create">Create Wish</Link>
          <Link to="/dashboard">Dashboard</Link>
          <a href="#"
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/login");
              window.location.reload();
              
            }}
          >
            Logout
          </a>
        </div>
      </nav>
    );
  }else{
    return (
      <nav>
        <div className="nav-title-wrapper"><h1>WishUpon...</h1></div>
        <div className="nav-spaceholder"></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>

      </nav>
    );
  }

};

export default NavBar;