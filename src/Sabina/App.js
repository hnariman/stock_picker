import React from "react";
import Navbar from "./Navbar";
import Account from "./Account";
import Stock from "./Stock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/Account" component={Account} />
          <Route path="/Stock" component={Stock} />
        </Switch>
      </Router>
    );
  }
}
export default App;
