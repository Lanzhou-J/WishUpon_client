import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Dashboard.scss";

class Dashboard extends React.Component {
  state = {
    wishes: [],
    user: null,
    completed_wishes: [],
    not_completed_wishes: [],
  };

  // make an http GET request to get wishes that belongs to current user
  getUserWishes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishes/current_user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    // the reverse() method makes sure that latest wishes are always on the top of the dashboard page
    this.setState({
      wishes: data,
      completed_wishes: data.completed_wishes.reverse(),
      not_completed_wishes: data.not_completed_wishes.reverse(),
    });
  };

  // make an http GET request to get current user information e.g. name, age etc.
  getUserInfo = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/current_user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ user: data });
  };

  // conditinal rendering: if wish is secret, show Secret wish tag
  showSecret = (wish) => {
    if (wish.is_secret) {
      return <p>Secret wish</p>;
    } else {
      return <></>;
    }
  };

  // Send a DELETE http request to the backend to delete a wish
  deleteWish = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.props.history.push("/wishes");
  };

  // send a put request to backend to edit the is_completed attribute of a wish
  markAsComplete = async (id) => {
    let is_completed = true;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ is_completed }),
    });
    this.props.history.push(`/wishes/${id}`);
  };

  refreshPage = () => {
    window.location.reload();
  };

  // the delete request will only be sent if users confirmed.(click "OK")
  confirmDelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete This Wish?")) {
      this.deleteWish(id);
    }
  };

  protectedButtons = (wish) => {
    return (
      <div className="protectedButtons">
        <Link to={`/wishes/${wish.id}/edit`}>
          <button className="edit-back-delete-button" data-testid="editButton">
            Edit
          </button>
        </Link>
        <span onClick={() => this.confirmDelete(wish.id)}>
          <button
            className="edit-back-delete-button"
            data-testid="deleteButton"
          >
            Delete
          </button>
        </span>
        <button onClick={() => this.markAsComplete(wish.id)}>
          Mark as completed
        </button>
      </div>
    );
  };

  renderWishesCard = (wishes) => {
    if (wishes) {
      return wishes.map((wish, index) => {
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
                {this.showSecret(wish)}
              </div>

              <div className="card-face flip-card-back">
                <Link
                  to={{ pathname: `/wishes/${wish.id}` }}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className="card-text">
                    <h3 className="wish-index-title">{wish.title}</h3>
                    <p>Description: {wish.description}</p>
                  </div>
                </Link>
                <div className="card-like-wrapper">
                  <div className="card-like">
                    <img
                      src="heart.svg"
                      alt="hearlogo"
                      height="30"
                      width="30"
                    />
                  </div>
                  <p>Like:{wish.like}</p>
                  {this.protectedButtons(wish)}
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <></>;
    }
  };

  renderUserInfo = () => {
    const user = this.state.user;
    if (user) {
      const hobbies = [];
      user.hobbies.forEach((hobby) => {
        hobbies.push(hobby.name);
      });
      return (
        <div className="userinfo">
          <div className="profilepic">
            <img src="picture.svg" alt="" />
          </div>
          <p className="Username">
            {user.user.first_name} {user.user.last_name}
          </p>
          <p className="userinfo-text">{user.country.name}</p>
          <p className="userinfo-text">Age:{user.user.age}</p>
          <p className="userinfo-text">Hobbies: {`${hobbies} `}</p>
          <Link style={{ marginLeft: "20px" }} to="/editprofile">
            Edit profile
          </Link>
        </div>
      );
    }
  };

  async componentDidMount() {
    this.getUserWishes();
    this.getUserInfo();
  }

  render() {
    const not_completed_wishes = this.state.not_completed_wishes;
    const completed_wishes = this.state.completed_wishes;

    return (
      <div className="wish-index-container">
        <div className="userinfo-container">{this.renderUserInfo()}</div>
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
    );
  }
}

export default Dashboard;
