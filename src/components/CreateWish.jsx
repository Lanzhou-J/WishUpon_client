import React from "react";
import "../stylesheets/CreateWish.scss";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import { colourOptions } from "./data";

class CreateWish extends React.Component {
  state = {keywords: []}

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

  handleSelectChange = (keywords) => {
    this.setState({keywords})
    console.log(`Option selected:`, keywords);
    // selectedOption.forEach((option, index)=>{
    //   this.setState({[index]: option.value.word})
    // })
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state)
    const body = this.state;
    const data = new FormData();
    for (let key in body) {
      data.append(`wish[${key}]`, body[key]);
    }

    body.keywords.forEach((word,index)=>{
      data.append(`wish[keyword${index+1}]`, word.label);
    })

    console.log(data)
    await fetch("http://localhost:3000/wishes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });
    this.props.history.push("/dashboard");
  };

  getKeywordsData = async () => {
    const response = await fetch("http://localhost:3000/keywords/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    this.setState({ keywordsdata: data });
    // console.log(this.state);
  };

  renderKeywords = () => {
    if (this.state.keywordsdata) {
      let keywordsarr = [];
      this.state.keywordsdata.keywords.forEach((keyword, index) => {
        keywordsarr.push({ value: keyword, label: keyword.word, index: index });
      });
      // console.log(keywordsarr);

      return (
        <div style={{ width: "250px" }}>
          <CreatableSelect
            value = {this.state.keywords}
            id="keyword1"
            // value={selectedValue}
            menuPlacement="auto"
            menuPosition="fixed"
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={keywordsarr}
            onChange={this.handleSelectChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {/* <br />
          <b>Selected Value:</b> */}
        </div>
      );
    } else {
      return <></>;
    }
  };

  componentDidMount() {
    this.getKeywordsData();
    console.log(this.state)
  }
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
          <h3>Select from existed keywords:</h3>

          <div className="keywordsdata-container">{this.renderKeywords()}</div>
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
