import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Account from './Account.jsx';
import Navbar from "./Navbar";
import Stock from './Stock';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super()
    this.callFetch()
  }
  state = {
    balance: null
  }
  callFetch = () => {
    fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          balance: data.currentBalance
        })
      });
  }
  render() {
    const balance = this.state.balance
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/Account" component={Account} />
          <Route path="/Stock" component={Stock} />
          <Route exact path="/BuyStock"><BuyStock price={88.07} openCloseFunction={this.buy} code='NKE' currentBalance={balance} name='Nike' /></Route>
        </Switch>
        <Footer currentBalance={balance} />
      </Router>
    );
  }
}
export default App;
