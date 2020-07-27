import React from "react";
import "../stylesheets/CreateWish.scss";

class CreateWish extends React.Component {
  onInputChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        [key]: event.target.files[0],
      });
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
    console.log(this.state);
    // console.log(this.props);
    // console.log(this.body);
  };

  // handleOptionChange = changeEvent => {
  // this.setState({
  //   selectedOption: changeEvent.target.value
  // });
  // };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = this.state;
    const data = new FormData();
    for (let key in body) {
      data.append(`wish[${key}]`, body[key]);
    }
    await fetch("http://localhost:3000/wishes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });
    this.props.history.push("/dashboard");
  };

  render() {
    // console.log(this.state);
    // console.log(localStorage.getItem("token"));
    return (
      <div className="form-container-wish" style={{ margin: "0 0 35px 0" }}>
        <form
          className="wish-form"
          onSubmit={this.onFormSubmit}
          encType="multipart/form-data"
        >
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
          <label htmlFor="is_secret">Is this a secret wish?</label>
          <div className="is_secret">
            <label>
              <input
                type="radio"
                name="is_secret"
                id="is_secret"
                value="true"
                className="form-check-input"
                onChange={this.onInputChange}
              />
              true
            </label>
          </div>
          <div className="is_secret">
            <label>
              <input
                type="radio"
                name="is_secret"
                id="is_secret"
                value="false"
                className="form-check-input"
                onChange={this.onInputChange}
              />
              false
            </label>
          </div>

          <label htmlFor="is_anonymous">Is this an anonymous wish?</label>
          <div className="is_anonymous">
            <label>
              <input
                type="radio"
                name="is_anonymous"
                id="is_anonymous"
                value="true"
                className="form-check-input"
                onChange={this.onInputChange}
              />
              true
            </label>
          </div>
          <div className="is_anonymous">
            <label>
              <input
                type="radio"
                name="is_anonymous"
                id="is_anonymous"
                value="false"
                className="form-check-input"
                onChange={this.onInputChange}
              />
              false
            </label>
          </div>
          <label htmlFor="keyword1">Keyword 1:</label>
          <input
            className="wish-input"
            type="text"
            name="keyword"
            id="keyword"
            onChange={this.onInputChange}
          />
          <label htmlFor="keyword2">Keyword 2:</label>
          <input
            className="wish-input"
            type="text"
            name="keyword"
            id="keyword"
            onChange={this.onInputChange}
          />
          <label htmlFor="keyword3">Keyword 3:</label>
          <input
            className="wish-input"
            type="text"
            name="keyword"
            id="keyword"
            onChange={this.onInputChange}
          />
          <br />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={this.onInputChange}
          />
          <input className="wish-submit" type="submit" value="Add Entry" />
        </form>
      </div>
    );
  }
}

export default CreateWish;
