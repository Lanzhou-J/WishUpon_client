import React from "react";
import CreatableSelect from "react-select/creatable";

class EditWish extends React.Component {
  state = {
    title: "",
    description: "",
    user_id: "",
    loading: true,
    id: this.props.match.params.id,
    image: "",
    keywords: [],
    is_secret: null,
    is_anonymous: null,
    is_completed: null,
  };
  onInputChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        uploadedImage: event.target.files[0],
      });
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
  };

  handleSelectChange = (keywords) => {
    this.setState({ keywords });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    let {
      id,
      image,
      uploadedImage,
    } = this.state;

    if (uploadedImage) {
      const data = new FormData();
      data.append("wish[image]", uploadedImage);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/wishes/image/${id}`,
        {
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      image = await response.text();
    }

    let clone = this.state;
    delete clone.image;
    delete clone.uploadedImage;
    delete clone.loading;
    delete clone.keywordsdata;

    const datacopy = new FormData();
    for (let key in clone) {
      datacopy.append(`wish[${key}]`, clone[key]);
    }
    if (clone.keywords) {
      clone.keywords.forEach((word, index) => {
        datacopy.append(`wish[keyword${index + 1}]`, word.label);
      });
    }

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: datacopy,
    });
    this.props.history.push(`/wishes/${id}`);
  };

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
            id="keyword1"
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

  // get the original data of this wish and display them inside input boxes
  async componentDidMount() {
    const { id } = this.state;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/wishes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    if (data.wishes) {
      const {
        title,
        description,
        user_id,
        is_secret,
        is_anonymous,
        is_completed,
        keywords,
      } = data.wishes[0];
      let newkeywords = [];
      keywords.forEach((word) => {
        newkeywords.push({ value: word, label: word.word, index: word.id });
      });
      this.setState({
        title,
        user_id,
        description,
        is_anonymous,
        is_secret,
        is_completed,
        loading: false,
      });
      this.setState({ keywords: newkeywords });
      this.getKeywordsData();
    }
  }

  render() {
    const {
      title,
      description,
      is_secret,
      is_anonymous,
      is_completed,
      loading,
    } = this.state;
    return (
      !loading && (
        <div className="form-container-wish-edit">
          <form className="wish-form" onSubmit={this.onFormSubmit}>
            <h1>Edit a wish</h1>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={this.onInputChange}
              value={title}
              style={{ width: "400px", height: "30px" }}
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="wish-input"
              name="description"
              id="description"
              onChange={this.onInputChange}
              value={description}
            ></textarea>
            <div className="radiobutton-container">
              <label htmlFor="is_secret">
                Is this a secret wish? ({is_secret.toString()})
              </label>
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
              <label htmlFor="is_anonymous">
                Is this an anonymous wish? ({is_anonymous.toString()})
              </label>
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
            <div className="radiobutton-container">
              <label htmlFor="is_completed">
                Is this wish completed? ({is_completed.toString()})
              </label>
              <div className="is_completed">
                <label>
                  <input
                    type="radio"
                    name="is_completed"
                    id="is_completed"
                    value="true"
                    className="form-check-input"
                    onChange={this.onInputChange}
                  />
                  true
                </label>
              </div>
              <div className="is_completed">
                <label>
                  <input
                    type="radio"
                    name="is_completed"
                    id="is_completed"
                    value="false"
                    className="form-check-input"
                    onChange={this.onInputChange}
                  />
                  false
                </label>
              </div>
            </div>
            <h3>Select from existed keywords or create new keywords:</h3>

            <div className="keywordsdata-container">
              {this.renderKeywords()}
            </div>
            <br />
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={this.onInputChange}
            />
            <input
              className="wish-submit"
              type="submit"
              data-testid="wish-submit"
              value="Submit"
            />
          </form>
        </div>
      )
    );
  }
}

export default EditWish;
