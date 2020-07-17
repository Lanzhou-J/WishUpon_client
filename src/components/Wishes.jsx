import React from "react";
import { Link } from "react-router-dom";

class Wishes extends React.Component {
  state = { wishes: [] };

  getWishes = async () => {
    const response = await fetch("http://localhost:3000/wishes/", {
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      // }
    });
    const data = await response.json();
    this.setState({ wishes: data.wishes });
    console.log(this.state);
  };

  renderWishes = () => {
    return this.state.wishes.map((wish, index) => {
      return (
        <div className="wish-index" key={index}>
          <Link to={{ pathname: `/wishes/${wish.id}`}}>          
          <h3 className="wish-index-title">{wish.title}</h3>
          <p>Description: {wish.description}</p>
          </Link>
          <hr/>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="wish-index-container">
        {this.renderWishes()}
      </div>
    );
  }

  async componentDidMount() {
    this.getWishes();
  }
}

export default Wishes;