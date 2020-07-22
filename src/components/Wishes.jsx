import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Wishes.scss"

class Wishes extends React.Component {
  state = { wishes: [] };

  getWishes = async () => {
    const response = await fetch("http://localhost:3000/wishes/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    this.setState({ wishes: data});
    // console.log(this.state);
  };

  renderWishes = () => {
    // console.log(this.state)
    return this.state.wishes.map((wish, index) => {
      return (
          <div className="card-wrapper">
            <div className="wish-index card" key={index}>  
              <Link to={{ pathname: `/wishes/${wish.id}`}}>          
                <h3 className="wish-index-title">{wish.title}</h3>
                <p>Description: {wish.description}</p>
              </Link>
              <hr />
            </div>
          </div>
      );
    });
  };

  render() {
    return (
      <div className="wish-index-container">
          <h1 className="title">Wishes</h1>
          <div className="card-container">
              {this.renderWishes()}
          </div>
      </div>
    );
  }

  async componentDidMount() {
    this.getWishes();
  }
}

export default Wishes;
