import React from "react";
import { Link } from "react-router-dom";
// import moment from 'moment';

class Wish extends React.Component {
  state = { wishes: null, comments: null };
  deleteWish = async (id) => {
    await fetch(`http://localhost:3000/wishes/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    window.alert("Deleted The Post!");
    this.props.history.push("/wishes");
  };

  showWish = async (id) => {
    const response = await fetch(`http://localhost:3000/wishes/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    console.log(data.keywords)
    this.setState({ wishes: data});
  }

  showComment = async(id) => {
    const response = await fetch(`http://localhost:3000/wishes/${id}/comments`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    // console.log(data)
    this.setState({ comments: data});
  }

  renderComments = () => {
    // console.log(this.state.comments)
    return this.state.comments.map((comment, index) => {
      return (
        <div className="wish-index" key={index}>  
          <p> {comment.user.first_name}:{comment.content}</p>
          <p>{comment.created_at}</p>
          <hr />
        </div>
      );
    });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state);
    // console.log(this.props);
    // console.log(this.body);
  };

  onCommentFormSubmit = async(event) => {
    const b = this.props.match.params.id;
    event.preventDefault();

    const body = {content: this.state.content};

    await fetch(`http://localhost:3000/wishes/${b}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    window.location.reload();
    // this.setState((state)=>{
    //   return {comments: [...state.comments, ]}
    // })
  };

  createComments = () => {
    return (
      <div className="form-container-wish" style={{ margin: "0 0 35px 0" }}>
        <form className="wish-form" onSubmit={this.onCommentFormSubmit}>
          <h4>Add a comment:</h4>
          <label htmlFor="content">Content:</label>
          <input
            className="wish-input"
            type="text"
            name="content"
            id="content"
            onChange={this.onInputChange}
          />
          <input type="submit" value="Add Entry" />
        </form>
      </div>
    )   
  }

  componentDidMount(){
    const b = this.props.match.params.id;
    // console.log(b)
    this.showWish(b)
    this.showComment(b)
    
  }

  render() {
    // console.log(this.state)
    const wish = this.state.wishes
    const comments = this.state.comments
    // console.log(comments)
    if(wish&&comments){
      // console.log(comments.comments)
      let keywords = []
      wish.keywords.forEach((word)=>{
        keywords.push(word.word)
      })
      return (
        <div className="wish-view">
          <h1>Wish</h1>
          <h1>{wish.title}</h1>
          <p>{wish.user.first_name}</p>
          <p>{wish.description}</p>
          <p>Keywords: {`${keywords} `}</p>
          <Link to={`/wishes/${wish.id}/edit`}>
            <button className="edit-back-delete-button" >Edit</button>
          </Link>
          <span onClick={() => this.deleteWish(wish.id)}>
            <button className="edit-back-delete-button" >Delete</button>
          </span>
          <div className="comments">
           <h3>Comments:</h3>
          {this.renderComments()}
          </div>
          {this.createComments()}
        </div>
      );
    }else{
      return(
        <>
        </>
      )
    }
  }
}

export default Wish;