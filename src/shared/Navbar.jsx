// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/wishes">Wishes</Link>
      <Link to="/wishes/create">Create Wish</Link>
      <Link to="/login">Login</Link>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/secrets">Secrets</Link>
      <span
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        Logout
      </span>
    </nav>
  );
};

export default NavBar;