import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import PortfolioTable from './PortfolioTable';

class Account extends React.Component {

  state = { portfolio:[], balance:0, market:[]}
  componentDidMount ()  { this.getPortfolio(); this.getBalance(); this.getMarket() };

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
  getMarket = (query) => {
    fetch(query)
      .then (res => res.json())
      .then (res => this.setState({market: res.change}))
      .catch(err => console.log(err))
  }

  render() {
    const {portfolio, market} = this.state;
    portfolio.balance = this.state.balance;
    portfolio.map(x => x.marketPrice=100);
    const host = 'https://financialmodelingprep.com/api/v3/quote/';
    let tickers = portfolio.map(x => x.code)
    tickers = tickers.filter((acc,item) => tickers.indexOf(acc) === item)
    const query = host + tickers.toString().split(' ').join('_')
    console.log(query)
    console.log(this.state.market)
    return ( 
    <p>
      {portfolio.map(x => 
      <List> 
         {x.code} 
         {x.amount}pcs 
         {x.purchasePrice.toFixed(2)}$ 
         { ((x.purchasePrice - x.marketPrice) > 0) ? " looser " : " winner "  } 
      </List>)}
    </p>
    );
  }
}

const List = styled.p`
border: 1px solid grey;
width:30vw;
height: 40hw;
margin:0 auto;
line-height: 2rem;
font-size: 1.5rem;
`;

export default Account;
