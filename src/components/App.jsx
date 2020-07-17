import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Wishes from "./Wishes";
// import CreateWish from "./CreateWish";


class App extends React.Component {
  render() {
    return (
      <>
        {/* <Navbar /> */}
        <Switch>
          {/* <Route exact path="/wishes/create" component={CreateWish} /> */}
          {/* <Route exact path="/wishes/:id/edit" component={EditWish} /> */}
          {/* <Route exact path="/wishes/:id" component={Wish} /> */}
          <Route exact path="/wishes" component={Wishes} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/sign-up" component={SignUp} /> */}
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;

