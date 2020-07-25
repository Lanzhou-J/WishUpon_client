import React from 'react'
import { Link } from "react-router-dom";
import "../stylesheets/Dashboard.scss"

class Dashboard extends React.Component {
  state = { wishes: [], user: null };

  getUserWishes = async () => {
    const response = await fetch("http://localhost:3000/wishes/current_user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    this.setState({ wishes: data});
    console.log(this.state);
  };

  getUserInfo = async () => {
    const response = await fetch("http://localhost:3000/users/current_user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    this.setState({ user: data});
    // console.log(this.state);
  };

  renderWishesCard = (wishes) => {
    if(wishes){
    return wishes.map((wish, index) => {
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
                  <img src={wish.image} alt=""/>
                </div>
              </div>  

                <div className="card-face flip-card-back">
                <Link to={{ pathname: `/wishes/${wish.id}`}} style={{color: 'inherit', textDecoration: 'none' }}>
                  <div className="card-text">
                  <h3 className="wish-index-title">{wish.title}</h3>
                  <p>Description: {wish.description}</p>
                  </div>
                  </Link>
                  <div className="card-like-wrapper">
                    <div className="card-like">
                      <img src="heart.svg" alt="hearlogo" height="30" width="30"/>
                    </div>
                    <p>Like</p>
                  </div> 
                </div> 
            </div>
          </div>
       );
    });
    }else{
      return(<></>)
    }

  }

  // renderUserWishes = () => {
  //   let newwishes = this.state.wishes
  //   // console.log(this.state)
  //   console.log(newwishes)
  //   console.log(newwishes.not_completed_wishes)
  //   console.log(newwishes.completed_wishes)
  // };

  renderUserInfo = () => {
    const user = this.state.user
    if(user){
      const hobbies=[];
      user.hobbies.forEach((hobby)=>{
        hobbies.push(hobby.name)
      })
      // console.log(hobbies)
      return(
        <div className="userinfo">
          <div className="profilepic">
            <img src="picture.svg" alt=""/>
          </div>
          <p className="Username">{user.user.first_name}</p>
          <p className="userinfo-text">{user.country.name}</p>
          <p className="userinfo-text">Hobbies: {`${hobbies} `}</p>
          <Link style={{marginLeft:'20px'}} to="/">Edit profile</Link>
        </div>
      )
    }
  }

  async componentDidMount() {
    this.getUserWishes();
    this.getUserInfo();
  }  

  render() {
    let newwishes = this.state.wishes
    // console.log(this.state)
    console.log(newwishes)
    const not_completed_wishes = newwishes.not_completed_wishes
    const completed_wishes = newwishes.completed_wishes
    return (
      <div className="wish-index-container">
        {/* <h1 className="title">User Dashboard: my wishes</h1> */}
        <div className="userinfo-container">
          {this.renderUserInfo()}
        </div>
        <div className="wishes-box">
        <div className="left">
          <h3>My Wishlist</h3>
          <div className="not-completed-wishes">
            <div className="card-container">
              {this.renderWishesCard(not_completed_wishes)}
            </div>
          </div>
        </div>
        <div className="right">
          <h3>Completed wishes!</h3>
          <div className="completed-wishes">
            {this.renderWishesCard(completed_wishes)}
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Dashboard