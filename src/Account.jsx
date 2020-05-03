import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import PortfolioTable from './PortfolioTable';

class Account extends React.Component {

  state = { portfolio:[], balance:0 }
  componentDidMount ()  { this.getPortfolio(); this.getBalance() };

  getPortfolio = () => {
    fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks')
      .then (res => res.json())
      .then (res => this.setState({portfolio: res}))
      .catch(err => console.log(err))
  }

  getBalance = () => {
    fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1')
      .then (res => res.json())
      .then (res => this.setState({balance: res.currentBalance}))
      .catch(err => console.log(err))
  }

  render() {
    const {portfolio} = this.state;
    portfolio.balance = this.state.balance;
    portfolio.map(x => x.marketPrice=20);
    return ( 
    <p>
      {portfolio.map(x => 
      <List> 
        {x.code} 
        {x.amount}pcs 
        {x.purchasePrice} 
        { ((x.purchasePrice - x.marketPrice) > 0) ? " looser " : " winner " }
      </List>)}
    </p>
    );
  }
}

const List = styled.p`
border: 1px solid grey;
width:30vw;
margin:0 auto;
line-height: 2rem;
font-size: 1.5rem;
`

export default Account;
