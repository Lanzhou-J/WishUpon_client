import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Home.css"

class Home extends React.Component {
  render() {
    return (
      <div className="Home-container">
        <div className="image-container">
          <div className="image-wrapper">
            <img id="Home-image" src="Jovia_Illustrations.png" alt="Jovia_Illustrations1"/>
          </div>
        </div>
        <div className="text-container">
          <h1 className="home-text">Make Your Wishes Come True When You <span>Wish Upon...</span></h1>
          <p className="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias nam molestiae tempora quas dolor quaerat cumque nostrum fugit, assumenda magni?</p>
          <div className="button-container">
            <Link className="link-login" to="/login"><button className="button-login">LOGIN</button></Link>
            <Link className="link-sign-up" to="/sign-up"><button className="button-sign-up">SIGN UP</button></Link>
            <a className="link-about" href="#">About</a>
          </div>

        </div>

      </div>
    )
  }
}

export default Home;