import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Home.scss";

// Landing page, with buttons that link to Login/Signup page
class Home extends React.Component {
  render() {
    return (
      <div className="Home-container active">
        <div className="image-container">
          <div className="image-wrapper">
            <img
              id="Home-image"
              src="Jovia_Illustrations.png"
              alt="Jovia_Illustrations"
            />
          </div>
        </div>
        <div className="text-container">
          <div className="text-wrapper">
            <h1 className="home-text">
              Make Your Wishes Come True When You <span>Wish Upon...</span>
            </h1>
            <p className="text">
              Wish Upon… is an online web application where users can enter
              their wish and share it with others. It allows a user to submit a
              public wish where other users can see and fulfil. Its purpose is
              to provide a friendly atmosphere where users can meet over chat
              and have fun, it allows for people that want to give joy back to
              their community.
            </p>
          </div>
          <div className="button-container">
            <Link className="link-login" to="/login">
              <button className="button button-login">LOGIN</button>
            </Link>
            <Link className="link-sign-up" to="/sign-up">
              <button className="button button-sign-up">SIGN UP</button>
            </Link>
            <Link className="link-about" to="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
