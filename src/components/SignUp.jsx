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
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  render() {
    const { email, password, country_id} = this.state;
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
          />
          <label htmlFor="country_id">Country ID</label>
          <input
            type="country_id"
            name="country_id"
            id="country_id"
            value={country_id}
            onChange={this.onInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;