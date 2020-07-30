import React from "react";
import "../stylesheets/Searchresult.scss";
import { Link } from "react-router-dom";

// This part is for showing the searched result on wishes page
class Searchresult extends React.Component {
  state = { wishes: [] };

  // searchwish function maps through wishes and find all the wishes that contain the keyword.
  // acceppts 2 parameter: wishes and keyword, both are included in this.props
  searchwish = (wishes, keyword) => {
    let searchwishes = [];
    wishes.forEach((wish, index) => {
      const found = wish.keywords.find((element) => element.word === keyword);
      if (found) {
        searchwishes.push(wish);
      }
    });
    // the searchwishes array contain all the wishes that have the same keyword
    // that user input in the search bar.
    return searchwishes.map((wish, index) => {
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

  // show users what keywords they are lookng for
  // show users the search results in wishes cards format
  render() {
    return (
      <div className="searchresult-container">
        <p>You are searching for: {this.props.searchkeyword}</p>
        <div className="card-container">
          {this.searchwish(this.props.wishes, this.props.searchkeyword)}
        </div>
      </div>
    );
  }
}

export default Searchresult;
