import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

class Account extends React.Component {

  state = { portfolio:[], balance:0, currentPrices:[], tickers:[]}
  componentDidMount ()  { this.getPortfolio(); this.getBalance(); this.getCurrentMarketPrices(); };

  getPortfolio = () => {
    fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks')
      .then (res => res.json())
      .then (res => {
        const host = 'https://financialmodelingprep.com/api/v3/quote/';
        const tickers = res.map(x => x.code).filter((total,item) => res.map(x => x.code).indexOf(total) === item)
        this.setState({tickers:tickers})
        const query = host + tickers.toString().split(' ').join('')
        console.log(query)
        this.setState({portfolio:res})
        this.getCurrentMarketPrices(query);
      })
      .catch(err => console.log(err))
  }

  getBalance = () => {
    fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1')
      .then (res => res.json())
      .then (res => this.setState({balance: res.currentBalance}))
      .catch(err => console.log(err))
  }
  getCurrentMarketPrices = (query) => {
    fetch(query)
      .then (res => res.json())
      .then (res => {
        res.map(x => console.log(x))
        const currentPrices = res.map(x => x)
        this.setState({currentPrices: currentPrices});
        console.log(this.state.currentPrices[0].change)
      })
      .catch(err => console.log(err))
  }

  render() {
    const {portfolio, currentPrices, massiveData, tickers} = this.state;
    portfolio.balance = this.state.balance;

    const prices = portfolio.reduce((object,item) => {
      const ticker = item.code;
      const price = (item.purchasePrice == 0) ? 0 : item.purchasePrice;
      if(!portfolio.hasOwnProperty(ticker)) portfolio[ticker] = 0;
      portfolio[ticker] += price;
      return portfolio; },{});
    console.log(prices)

    const count = portfolio.reduce((object,item) => {
      const ticker = item.code;
      const amount = (item.amount == 0) ? 0 : item.amount;
      if(!portfolio.hasOwnProperty(ticker)) portfolio[ticker] = 0;
      portfolio[ticker]+= amount;
      return portfolio; },{});
    console.log(count)

    let rez = portfolio.reduce((x, {code:c, amount:a, purchasePrice: p}) => ({ ...x, [c]:(x[c] || 0) +p/a, }),{});
    console.log(rez)
    let newPortfolio = Object.keys(rez).map(x => ({code:x, amount:rez[x], purchasePrice:rez[x]}));
    console.log(newPortfolio)


    const final = portfolio.reduce((object,item) => {
      const ticker = item.code;
      const price = (item.purchasePrice == 0) ? 0 : item.purchasePrice;
      const amount = (item.amount == 0) ? 0 : item.amount;
      if(!portfolio.hasOwnProperty(ticker)) portfolio[ticker] = 0;
      portfolio[ticker] += price;
      console.log(portfolio[ticker])
      return portfolio; },{});
    console.log('final',final)
    console.clear();

    console.log(portfolio);
    const rezz = portfolio.reduce( (acc, val) =>{
      acc.sum += val.amount;
      return acc;
    }, {sum: 0})

    console.log(rezz)







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
