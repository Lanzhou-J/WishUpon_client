import React from "react";
import { Link } from "react-router-dom";
// import moment from 'moment';

class Wish extends React.Component {
  state = { wishes: null };
  deleteWish = async (id) => {
    await fetch(`http://localhost:3000/wishes/${id}`, {
      method: "DELETE"
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      // },
    });
    window.alert("Deleted The Post!");
    this.props.history.push("/wishes");
  };

  showWish = async (id) => {
    const response = await fetch(`http://localhost:3000/wishes/${id}`)
    const data = await response.json();
    console.log(data.description)
    this.setState({ wishes: data});
  }

  componentDidMount(){
    const b = this.props.match.params.id;
    console.log(b)
    this.showWish(b)
  }

  render() {
    console.log(this.state)
    const wish = this.state.wishes
    if(wish){
      return (
        <div className="wish-view">
          <h1>{wish.title}</h1>
          <p>{wish.description}</p>
          <Link to={`/wishes/${wish.id}/edit`}>
            <button className="edit-back-delete-button" >Edit</button>
          </Link>
          <span onClick={() => this.deleteWish(wish.id)}>
            <button className="edit-back-delete-button" >Delete</button>
          </span>
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