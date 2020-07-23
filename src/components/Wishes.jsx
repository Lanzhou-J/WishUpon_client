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
    this.setState({ wishes: data.wishes});
    // console.log(this.state);
  };

  renderWishes = () => {
    let newwishes = this.state.wishes
    // console.log(this.state)
    console.log(newwishes)
    // if(this.state.wishes.length!==0){
    return newwishes.map((wish, index) => {
      let keywords = []
      wish.keywords.forEach((word)=>{
        keywords.push(word.word)
      })
      // console.log(keywords)
      return (
          <div className="card-wrapper scene" key={index}>
            <div className="wish-index card" >
              <div className="card-face card-face-front">
                <p>Keywords: {`${keywords} `}</p>
                <div className="card-image">
                </div>
              </div>  
              <div className="card-face card-face-back">
                <Link to={{ pathname: `/wishes/${wish.id}`}}> 
                <h3 className="wish-index-title">{wish.title}</h3>
                </Link>
                <p>Description: {wish.description}</p> 
                {/* <img src={wish.image} alt=""/> */}
              </div>  
            </div>
          </div>
      );
    });
    // }

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
