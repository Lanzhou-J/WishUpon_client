import React from "react";

class EditWish extends React.Component {
  state = { title: "", description: "", user_id: 1, loading: true, id: this.props.match.params.id };
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { id, title, description, user_id } = this.state
    await fetch(`http://localhost:3000/wishes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, user_id }),
    });
    this.props.history.push("/wishes");
  };

  async componentDidMount() {
    const { id } = this.state
    const response = await fetch(`http://localhost:3000/wishes/${id}`);
    const { title, description, user_id } = await response.json();
    this.setState({ title, user_id, description, loading: false });
  }

  render() {
    const { title, user_id, description, loading } = this.state;
    return (
      !loading && (
        <div className="container">
          <h1>Edit a wish</h1>
          <form onSubmit={this.onFormSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={this.onInputChange}
              value={title}
            />
            <label htmlFor="user_id">User ID</label>
            <input
              type="text"
              name="user_id"
              id="user_id"
              onChange={this.onInputChange}
              value={user_id}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={this.onInputChange}
              value={description}
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    );
  }
}


export default EditWish;