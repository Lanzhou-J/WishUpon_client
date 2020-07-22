import React from "react";

class CreateWish extends React.Component {
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      user_id: 1
    });
    // console.log(this.state);
    // console.log(this.props);
    // console.log(this.body);
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = this.state;

    await fetch("http://localhost:3000/wishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    this.props.history.push("/wishes");
  };

  render() {
    // console.log(this.state);
    // console.log(localStorage.getItem("token"));
    return (
      <div className="form-container-wish" style={{ margin: "0 0 35px 0" }}>
        <form className="wish-form" onSubmit={this.onFormSubmit}>
          <h1>Add A Wish:</h1>
          <label htmlFor="title">Title:</label>
          <input
            className="wish-input"
            type="text"
            name="title"
            id="title"
            onChange={this.onInputChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            className="wish-input"
            type="text"
            name="description"
            id="description"
            onChange={this.onInputChange}
          />
          {/* <label htmlFor="user_id">User:</label>
          <input
            className="user-input"
            type="text"
            name="user_id"
            id="user_id"
            onChange={this.onInputChange}
          /> */}
          <br />
          <input type="submit" value="Add Entry" />
        </form>
      </div>
    );
  }
}

export default CreateWish;