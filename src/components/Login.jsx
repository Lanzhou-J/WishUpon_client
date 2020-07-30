import React from "react";
import "../stylesheets/login-signup.scss";

class Login extends React.Component {
  state = { email: "", password: "", errMessage: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/wishes");
        window.location.reload();
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <div className="Home-container">
        <div className="image-container">
          <div className="image-wrapper">
            <img
              id="Home-image"
              src="Jovia_illustrations3.png"
              alt="Jovia_Illustrations1"
            />
          </div>
        </div>

        <div className="form-container">
          <h1 className="text-wrapper login-h1">Welcome back</h1>
          {errMessage && <span>{errMessage}</span>}
          <form className="loginform" onSubmit={this.onFormSubmit}>
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
            <input id="login-button" type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
