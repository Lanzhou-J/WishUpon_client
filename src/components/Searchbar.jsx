import React from "react";
import Select from "react-select";
import "../stylesheets/Searchbar.scss"

// Introduction of the website including purpose and core features
class Searchbar extends React.Component {
  state = {keywords: ""}

  // make a get request to get all keywords in the database for users to select from
  getKeywordsData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/keywords/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    this.setState({ keywordsdata: data });
    // console.log(this.state);
  };

  //handleSelectChange is used in order to get input values from CreatableSelect
  handleSelectChange = (keyword) => {
    this.setState({keyword})
    // console.log(`Option selected:`, keyword);
    this.props.getSearchKeyword(keyword.label)
  }

  renderKeywords = () => {
    if (this.state.keywordsdata) {
      let keywordsarr = [];
      this.state.keywordsdata.keywords.forEach((keyword) => {
        keywordsarr.push({ value: keyword, label: keyword.word, index: keyword.id });
      });

      return (
        <div style={{ width: "250px" }}>
          <Select
            value={this.state.keyword}
            // value={selectedValue}
            menuPlacement="auto"
            menuPosition="fixed"
            // defaultValue={[colourOptions[2], colourOptions[3]]}
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
      // console.log("did not render keywords")
      return <></>;
    }
  };

  // get keywords from the database after render runs first time 
  componentDidMount() {
    this.getKeywordsData();
    // console.log(this.state)
  }
  render() {
    return(
    <div className="searchbar-container">
      <div className="searchbar-wrapper">
        <h3>Search keywords: </h3>
          {this.renderKeywords()}
      </div>
    </div>)
    }
  }

export default Searchbar;