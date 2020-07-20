import React from "react";

class SignUp extends React.Component {
  state = { email: "", password: "", country_id: ""};

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password, country_id} = this.state;
    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password, country_id}}),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ auth: { email, password, country_id}}),
        })
        const { jwt } = await response.json()
        localStorage.setItem("token", jwt);
        this.props.history.push("/secrets");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  render() {
    const { email, password, country_id} = this.state;
    return (
      <div className="Home-container">
        <div className="image-container">
          <div className="image-wrapper">
            <img id="Home-image" src="Jovia_illustrations2.jpg" alt="Jovia_Illustrations1"/>
          </div>
        </div>
        <div className="form-container">
          <h1 className="login-h1">Sign Up to Wish Upon...</h1>
          <form className="loginform" onSubmit={this.onFormSubmit}>
            <input className="form-input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.onInputChange}
            />
            <input className="form-input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onInputChange}
            />
            <input className="form-input"
              type="country_id"
              name="country_id"
              id="country_id"
              placeholder="country_id"
              value={country_id}
              onChange={this.onInputChange}
            />
            <input id="login-button" type="submit" value="Create Account" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;