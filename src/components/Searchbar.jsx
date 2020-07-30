import React from "react";
import Select from "react-select";
import "../stylesheets/Searchbar.scss";

// The Searchbar will pass the search keyword value to Wishes.jsx and set Wishes state
// (state lifting)
class Searchbar extends React.Component {
  state = { keywords: "" };

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

  //handleSelectChange is used in order to get input values from Select
  handleSelectChange = (keyword) => {
    this.setState({ keyword });
    this.props.getSearchKeyword(keyword.label);
  };

  // show keywords in the select options
  // Users can only select from existing options
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
          <Select
            value={this.state.keyword}
            menuPlacement="auto"
            menuPosition="fixed"
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

  // get all the keywords from the database after render runs first time
  componentDidMount() {
    this.getKeywordsData();
  }
  render() {
    return (
      <div className="searchbar-container">
        <div className="searchbar-wrapper">
          <h3>Search keywords: </h3>
          {this.renderKeywords()}
        </div>
      </div>
    );
  }
}

export default Searchbar;
