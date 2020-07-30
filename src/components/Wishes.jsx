import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Wishes.scss";
import Searchbar from "./Searchbar";
import SearchResult from "./SearchResult";

class Wishes extends React.Component {
  state = { wishes: [] };

  getWishes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishes/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ wishes: data.wishes.reverse() });
  };

  showCompleted = (wish) => {
    if (wish && wish.is_completed) {
      return <p>Completed</p>;
    } else {
      return <></>;
    }
  };

  getSearchKeyword = (input) => {
    this.setState((state) => {
      return { searchkeyword: input };
    });
  };

  renderWishes = () => {
    let newwishes = this.state.wishes;
    return newwishes.map((wish, index) => {
      let keywords = [];
      wish.keywords.forEach((word) => {
        keywords.push(word.word);
      });
      return (
        <div className="card-wrapper flip-card" key={index}>
          <div className="wish-index card flip-card-inner">
            <div className="card-face flip-card-front">
              <p className="card-keywords"> {`${keywords} `}</p>
              <div className="card-image">
                <img id="card-pic" src={wish.image} alt="" />
              </div>
              {this.showCompleted(wish)}
            </div>

            <div className="card-face flip-card-back">
              <Link
                to={{ pathname: `/wishes/${wish.id}` }}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div className="card-text">
                  <h3 className="wish-index-title">{wish.title}</h3>
                  <p id="card-paragraph">Description: {wish.description}</p>
                </div>
              </Link>
              <div className="card-like-wrapper">
                <div className="card-like">
                  <img src="heart.svg" alt="hearlogo" height="30" width="30" />
                </div>
                <p>Like:{wish.like}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  // Pass the getSearchKeyword function to Searchbar component as props.
  // then the state will contain the keyword that users input in search bar.
  // Pass this.state.wishes and this.state.searchkeyword to SearchResult as props
  render() {
    return (
      <div className="wish-index-container">
        <h1 className="title">Wishing wall</h1>
        <div className="card-container">{this.renderWishes()}</div>
        <Searchbar getSearchKeyword={this.getSearchKeyword} />
        <SearchResult
          wishes={this.state.wishes}
          searchkeyword={this.state.searchkeyword}
        />
      </div>
    );
  }

  async componentDidMount() {
    this.getWishes();
  }
}

export default Wishes;
