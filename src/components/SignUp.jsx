import React from "react";
import Select from "react-select";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    country_id: "",
    countries: [],
    country: "",
    first_name: "",
    last_name: "",
  };

  // handle input change of text input including email/passwords/names etc.
  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  // handle the input change of country selection bar
  handleSelectChange = (country) => {
    this.setState({ country });
    console.log(`Option selected:`, country);
  };

  // get country information from Countries API
  getCountry = async () => {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    const data = await response.json();
    this.setState({ countries: data });
    console.log(this.state);
  };

  // render 250 countries in the selection options
  // Users can only select from the existing options
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
      console.log(countriesarr);

      return (
        <div style={{ width: "250px" }}>
          <Select
            value={this.state.country}
            menuPlacement="auto"
            menuPosition="fixed"
            name="colors"
            options={countriesarr}
            onChange={this.handleSelectChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      );
    } else {
      console.log("did not render countries");
      return <></>;
    }
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    let { email, password, country, first_name, last_name } = this.state;
    if (country.value) {
      country = country.value.name;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: { email, password, first_name, last_name, country },
          }),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth: { email, password, first_name, last_name, country },
            }),
          }
        );
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/dashboard");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  componentDidMount() {
    this.getCountry();
  }

  render() {
    const { email, password, first_name, last_name } = this.state;
    return (
      <div className="Home-container">
        <div className="image-container">
          <div className="image-wrapper">
            <img
              id="Home-image"
              src="Jovia_illustrations2.jpg"
              alt="Jovia_Illustrations1"
            />
          </div>
        </div>
        <div className="signup-form-container">
          <h1 className="text-wrapper login-h1">
            Sign Up to <span>Wish Upon...</span>
          </h1>
          <form className="signupform" onSubmit={this.onFormSubmit}>
            <input
              className="form-input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.onInputChange}
            />
            <input
              className="form-input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onInputChange}
            />
            <input
              className="form-input"
              type="first_name"
              name="first_name"
              id="first_name"
              placeholder="Firstname"
              value={first_name}
              onChange={this.onInputChange}
            />
            <input
              className="form-input"
              type="last_name"
              name="last_name"
              id="last_name"
              placeholder="Lastname"
              value={last_name}
              onChange={this.onInputChange}
            />
            <p>Country or region:</p>
            <div className="keywordsdata-container">
              {this.renderCountries()}
            </div>
            <br />
            <input id="submit-button" type="submit" value="Create Account" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
