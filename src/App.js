import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Account from './Account.jsx';
import Navbar from "./Navbar";
import Stock from './Stock';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PortfolioTable from './PortfolioTable';

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
          <Route path="/Account" component={Account} />
          <Route path="/Stock" component={Stock} />
          <Route  path="/BuyStock"><BuyStock price={88.07} code='NKE' currentBalance={100000} name='Nike' refreshBalance={this.refreshBalance} /></Route>
        </Switch>
        <Footer currentBalance={balance} />
      </Router>
    );
  }
}
export default App;
