import React from "react";
import "../stylesheets/Searchresult.scss"
import { Link } from "react-router-dom";

// Introduction of the website including purpose and core features
class Searchresult extends React.Component {
  state={wishes:[]}

  searchwish = (wishes, keyword) => {
    let searchwishes = [];
    wishes.forEach((wish, index)=>{
      const found = wish.keywords.find(element=> element.word==keyword);
      if(found){
        searchwishes.push(wish)
      }
    })
    // console.log(searchwishes);
    return searchwishes.map((wish, index) => {
      let keywords = []
      wish.keywords.forEach((word)=>{
        keywords.push(word.word)
      })
      // console.log(keywords)
      return (
          <div className="card-wrapper flip-card" key={index}>
            <div className="wish-index card flip-card-inner" >
              <div className="card-face flip-card-front">
                <p className="card-keywords"> {`${keywords} `}</p>
                <div className="card-image">
                    <img id="card-pic" src={wish.image} alt=""/>
                </div>
                {/* {this.showCompleted(wish)} */}
              </div>  

                <div className="card-face flip-card-back">
                <Link to={{ pathname: `/wishes/${wish.id}`}} style={{color: 'inherit', textDecoration: 'none' }}>
                  <div className="card-text">
                  <h3 className="wish-index-title">{wish.title}</h3>
                  <p id="card-paragraph">Description: {wish.description}</p>
                  </div>
                  </Link>
                  <div className="card-like-wrapper">
                    <div className="card-like">
                      <img src="heart.svg" alt="hearlogo" height="30" width="30"/>
                    </div>
                    <p>Like:{wish.like}</p>
                  </div> 
                </div> 
            </div>
          </div>
       );
    });
  }



  render() {
    // console.log(this.props.wishes)
    // console.log(this.props.searchkeyword)
    return(
    <div className="searchresult-container">
      {/* <h3>Searched results:</h3> */}
      <p>You are searching for: {this.props.searchkeyword}</p>
      <div className="card-container">
      {this.searchwish(this.props.wishes, this.props.searchkeyword)}
      </div>

    </div>)
    }
  }

export default Searchresult;