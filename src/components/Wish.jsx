import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Wish.scss";

class Wish extends React.Component {
  state = { wishes: null, comments: null, count: 0 };

  // Make a get request to the backend to show one wish
  // based on id params
  showWish = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (data.wishes) {
      this.setState({ wishes: data.wishes[0], count: data.wishes[0].like });
    }
  };

  // Make a get request to the backend to show all comments of this wish
  showComment = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishes/${id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ comments: data });
  };

  // render comments on the wish webpage
  // display information including username/content/timestamp
  renderComments = () => {
    return this.state.comments.map((comment, index) => {
      return (
        <div className="wish-index" key={index}>
          <p>
            {" "}
            {comment.user.first_name}:{comment.content}
          </p>
          <p>{comment.created_at}</p>
          <hr />
        </div>
      );
    });
  };

  // handle input change of the comment form
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  // Make a Post request to the backend to store new comments in the database
  onCommentFormSubmit = async (event) => {
    const b = this.props.match.params.id;
    event.preventDefault();

    const body = { content: this.state.content };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishes/${b}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    window.location.reload();
  };

  // display the add comment form
  createComments = () => {
    return (
      <div className="form-container-comments" style={{ margin: "0 0 35px 0" }}>
        <form className="comment-form" onSubmit={this.onCommentFormSubmit}>
          <h4>Add a comment:</h4>
          <input
            className="comment-input"
            type="text"
            name="content"
            id="content"
            onChange={this.onInputChange}
            style={{ height: "25px", width: "400px" }}
          />
          <input
            id="addcomment"
            type="submit"
            data-testid="comments-button"
            value="Add A Comment"
            style={{
              backgroundColor: "white",
              border: "0.5px solid black",
              marginLeft: "8px",
              height: "25px",
            }}
          />
        </form>
      </div>
    );
  };

  // handle like button onClick - increment like counts logic
  incrementMe = async () => {
    const id = this.props.match.params.id;
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount,
    });

    let like = this.state.count + 1;
    console.log(like);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishes/like/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ like }),
    });
  };

  // Conditional rendering, if the wish is completed, show completed message
  // with the color of cornflowerblue
  showCompleted = (wish) => {
    if (wish && wish.is_completed) {
      return (
        <p style={{ color: "cornflowerblue", fontWeight: "bold" }}>
          This wish is completed!Yay!
        </p>
      );
    } else {
      return <></>;
    }
  };

  // get the wish data and get comments data after render runs for the first time
  componentDidMount() {
    const b = this.props.match.params.id;
    this.showWish(b);
    this.showComment(b);
  }

  // display the wish data including title, description, image etc. on the webpage
  render() {
    const wish = this.state.wishes;
    const comments = this.state.comments;
    if (wish && wish.is_anonymous) {
      wish.user = "Anonymous";
    }
    if (wish && comments) {
      let keywords = [];
      wish.keywords.forEach((word) => {
        keywords.push(word.word);
      });
      return (
        <div className="wish-view">
          <div className="wish-container">
            <div className="name-container">
              <p>{wish.user}</p>
              <div className="name-button-span"></div>

              <div className="button-wrapper">
                <Link to={`/room`}>
                  <button>I can help!</button>
                </Link>
              </div>
            </div>
            <div className="wish-image-container">
              <img src={wish.image} alt="" />
            </div>
            <div className="wish-bottom-container">
              <div className="wish-wrapper">
                {this.showCompleted(wish)}
                <h1>{wish.title}</h1>
                <p>Keywords: {`${keywords} `}</p>
                <p>{wish.description}</p>

                <button onClick={this.incrementMe}>
                  ❤ Likes: {this.state.count}
                </button>
              </div>
              <div className="like-comment-container">
                {this.createComments()}
              </div>
            </div>
          </div>
          <div className="comment-container">
            <div className="comments">
              <h3>Comments:</h3>
              {this.renderComments()}
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Wish;
