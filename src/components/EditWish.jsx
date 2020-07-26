import React from "react";

class EditWish extends React.Component {
  state = { title: "", description: "", user_id: "", loading: true, id: this.props.match.params.id, image:''};
  onInputChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        uploadedImage: event.target.files[0]
      })
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
    // console.log(this.state)
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    let { id, title, description, user_id, image, uploadedImage } = this.state;

    if(uploadedImage){
      const data = new FormData();
      data.append('wish[image]', uploadedImage)
      const response = await fetch(`http://localhost:3000/wishes/image/${id}`,{
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      image = await response.text()
    }

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
    const response = await fetch(`http://localhost:3000/wishes/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`       
      }
    });
    const data = await response.json();
    // console.log(data.wishes[0])
    const { title, description, user_id } = data.wishes[0]
    this.setState({ title, user_id, description, loading: false });
  }

  render() {
    const { title, user_id, description, loading } = this.state;
    return (
      !loading && (
        <div className="container">
          <form className="wish-form" onSubmit={this.onFormSubmit}>
            <h1>Edit a wish</h1>
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
              className="wish-input"
              name="description"
              id="description"
              onChange={this.onInputChange}
              value={description}
            ></textarea>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={this.onInputChange}
            />
            <input className="wish-submit" type="submit" value="Submit" />
          </form>
        </div>
      )
    );
  }
}


export default EditWish;