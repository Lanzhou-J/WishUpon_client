import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import "../stylesheets/EditProfile.scss";

class EditProfile extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    country: "",
    loading: true,
    image: "",
    age: 0,
    hobbies: [],
    id: "",
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

  handleSelectChange = (hobbies) => {
    this.setState({ hobbies });
  };
  handleCountryChange = (country) => {
    this.setState({ country });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    let id = this.state.id;
    let clone = this.state;
    delete clone.countries;
    delete clone.hobbiesdata;
    clone.country = this.state.country.label;
    const datacopy = new FormData();
    for (let key in clone) {
      datacopy.append(`user[${key}]`, clone[key]);
    }

    if (clone.hobbies) {
      clone.hobbies.forEach((hobby, index) => {
        datacopy.append(`user[hobby${index + 1}]`, hobby.label);
      });
    }
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: datacopy,
    });
    this.props.history.push(`/dashboard`);
  };

  getHobbiesData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/hobbies/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ hobbiesdata: data });
  };

  renderHobbies = () => {
    if (this.state.hobbiesdata) {
      let hobbiesarr = [];
      this.state.hobbiesdata.hobbies.forEach((hobby) => {
        hobbiesarr.push({ value: hobby, label: hobby.name, index: hobby.id });
      });

      return (
        <div style={{ width: "250px" }}>
          <CreatableSelect
            value={this.state.hobbies}
            id="keyword1"
            menuPlacement="auto"
            menuPosition="fixed"
            isMulti
            name="colors"
            options={hobbiesarr}
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

  getCountry = async () => {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    const data = await response.json();
    this.setState({ countries: data });
  };

  renderCountries = () => {
    if (this.state.countries) {
      let countriesarr = [];
      this.state.countries.forEach((country, index) => {
        countriesarr.push({
          value: country,
          label: country.name,
          index: index,
        });
      });

      if (this.state.country) {
      }

      return (
        <div style={{ width: "250px" }}>
          <Select
            value={this.state.country}
            menuPlacement="auto"
            menuPosition="fixed"
            name="colors"
            options={countriesarr}
            onChange={this.handleCountryChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  async componentDidMount() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/current_user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    const currentuser = data.user;

    let newhobbies = [];
    data.hobbies.forEach((hobby) => {
      newhobbies.push({ value: hobby, label: hobby.name, index: hobby.id });
    });

    const countryvalue = {
      value: data.country,
      label: data.country.name,
      index: data.country.id,
    };

    this.setState({
      first_name: currentuser.first_name,
      last_name: currentuser.last_name,
      age: currentuser.age,
      id: currentuser.id,
      country: countryvalue,
      loading: false,
    });
    this.setState({ hobbies: newhobbies });
    this.getHobbiesData();
    this.getCountry();
  }

  render() {
    const { first_name, last_name, age, loading } = this.state;
    return (
      !loading && (
        <div className="form-container-wish-edit">
          <form className="wish-form" onSubmit={this.onFormSubmit}>
            <h1>Edit User Profile</h1>
            <label htmlFor="title">Firstname</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={this.onInputChange}
              value={first_name}
              style={{ width: "250px", height: "30px" }}
            />
            <label htmlFor="title">Lastname</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={this.onInputChange}
              value={last_name}
              style={{ width: "250px", height: "30px" }}
            />
            <label htmlFor="title">Age</label>
            <input
              type="text"
              name="age"
              id="age"
              onChange={this.onInputChange}
              value={age}
              style={{ width: "250px", height: "30px" }}
            />
            <h3>Select from existed hobbies or create new hobbies:</h3>

            <div className="keywordsdata-container">{this.renderHobbies()}</div>
            <br />
            <p>Country or region:</p>
            <div className="keywordsdata-container">
              {this.renderCountries()}
            </div>
            <br />
            <input
              className="wish-submit"
              type="submit"
              data-testid="wish-submit"
              value="Edit Profile"
            />
          </form>
        </div>
      )
    );
  }
}

export default EditProfile;
