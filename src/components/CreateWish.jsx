import React from "react";
import "../stylesheets/CreateWish.scss";
import CreatableSelect from "react-select/creatable";

class CreateWish extends React.Component {
  state = { keywords: [] };

  // on input change create new key value pairs in state
  // based on form input id and content
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
  };

  //handleSelectChange is used in order to get input values from CreatableSelect
  handleSelectChange = (keywords) => {
    this.setState({ keywords });
  };

  // onFormSubmit is called when the create form is submitted
  // A new FormData object is created, send to backend and parsed to send params
  // since we have image file we can't send json file as content
  onFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(this.state)
    const body = this.state;
    const data = new FormData();
    for (let key in body) {
      data.append(`wish[${key}]`, body[key]);
    }

    body.keywords.forEach((word, index) => {
      data.append(`wish[keyword${index + 1}]`, word.label);
    });

    // Make a post request to create new wish
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });
    this.props.history.push("/dashboard");
  };

  // make a get request to get all keywords in the database for users to select from
  getKeywordsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/keywords/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ keywordsdata: data });
  };

  // show keywords in the select options
  // Users can search/select from existing options
  // and can also create new options
  // set "isMulti" in order to select multiple keywords
  // build a valid options array for CreatableSelect
  renderKeywords = () => {
    if (this.state.keywordsdata) {
      let keywordsarr = [];
      this.state.keywordsdata.keywords.forEach((keyword) => {
        keywordsarr.push({
          value: keyword,
          label: keyword.word,
          index: keyword.id,
        });
      });

      return (
        <div style={{ width: "250px" }}>
          <CreatableSelect
            value={this.state.keywords}
            menuPlacement="auto"
            menuPosition="fixed"
            isMulti
            name="colors"
            options={keywordsarr}
            onChange={this.handleSelectChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  // get keywords from the database after render runs first time
  componentDidMount() {
    this.getKeywordsData();
  }
  render() {
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
          <div className="radiobutton-container">
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
          </div>
          <div className="radiobutton-container">
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
          </div>
          <h3>Select from existed keywords or create new keywords:</h3>

          <div className="keywordsdata-container">{this.renderKeywords()}</div>
          <br />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={this.onInputChange}
          />
          <input className="wish-submit" type="submit" value="Add a wish" />
        </form>
      </div>
    );
  }
}

export default CreateWish;
