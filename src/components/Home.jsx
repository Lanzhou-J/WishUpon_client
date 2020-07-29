import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Home.scss"

class Home extends React.Component {
  render() {
    return (
      <div className="Home-container active">
        <div className="image-container">
          <div className="image-wrapper">
            <img id="Home-image" src="Jovia_Illustrations.png" alt="Jovia_Illustrations"/>
          </div>
        </div>
        <div className="text-container">
          <div className="text-wrapper">
            <h1 className="home-text">Make Your Wishes Come True When You <span>Wish Upon...</span></h1>
            <p className="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias nam molestiae tempora quas dolor quaerat cumque nostrum fugit, assumenda magni?</p>
          </div>
          <div className="button-container">
            <Link className="link-login" to="/login"><button className="button button-login">LOGIN</button></Link>
            <Link className="link-sign-up" to="/sign-up"><button className="button button-sign-up">SIGN UP</button></Link>
            <Link className="link-about" to="/about"><a className="link-about" href="#">About</a></Link>
          </div>

        </div>

      </div>
    )
  }
}

export default Home;