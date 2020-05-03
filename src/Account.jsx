import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import Navbar from "./Navbar";
import AccountTickerList from './AccountTickerList'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import PortfolioTable from './PortfolioTable';

class Account extends React.Component {

  render() {

    return (
      <AccountTickerList />
    )
  }
}



export default Account;
