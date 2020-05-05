import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Account from './Account.jsx';
import Navbar from "./Navbar";
import Stock from './Stock';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    balance: null
  }
  componentDidMount() {
    this.callFetch()
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
  refreshBalance = (res) => {
    this.setState({
      balance: res
    })
  }

  render() {
    const balance = this.state.balance
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact   render={() => (<Account balance={balance} />)} />
          <Route path="/Stock" component={Stock} />
          <Route path="/BuyStock" render={(routeProps) => (<BuyStock {...routeProps} currentBalance={balance} refreshBalance={this.refreshBalance} />)} />
        </Switch>
        <Footer currentBalance={balance} />
      </Router>
    );
  }
}
export default App;
