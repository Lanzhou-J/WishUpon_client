import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from "./SignUp";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Wishes from "./Wishes";
import Wish from "./Wish";
import CreateWish from "./CreateWish";
import EditWish from "./EditWish";


class App extends React.Component {
  render() {
    return (
      <>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/wishes/create" component={CreateWish} />
          <Route exact path="/wishes/:id/edit" component={EditWish} />
          <Route exact path="/wishes/:id" component={Wish} />
          <Route exact path="/wishes" component={Wishes} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;

