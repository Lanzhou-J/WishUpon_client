import React from "react";

class CreateWish extends React.Component {
  onInputChange = (event) => {
    const key = event.target.id;    
    if (event.target?.files) {
      this.setState({
        [key]: event.target.files[0]
      })
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
    // console.log(this.state);
    // console.log(this.props);
    // console.log(this.body);
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData()

    for(let key in this.state){
      data.append(`wish[${key}]`, this.state[key])
    }


    // const body = this.state;

    const response = await fetch("http://localhost:3000/wishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });
    const {image, wish} = await response.json();
    // console.log(image)
    // console.log(wish.title)
    this.props.history.push("/wishes");
  };

  render() {
    // console.log(this.state);
    // console.log(localStorage.getItem("token"));
    return (
      <div className="form-container-wish" style={{ margin: "0 0 35px 0" }}>
        <form className="wish-form" onSubmit={this.onFormSubmit} encType="multipart/form-data">
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
          <br />
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" onChange={this.onInputChange}/>
          <input type="submit" value="Add Entry" />
        </form>
      </div>
    );
  }
}

export default CreateWish;