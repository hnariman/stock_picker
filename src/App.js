import React from 'react';
import TickerList from './TickerList.js';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import {
  BrowserRouter as Router, Route, NavLink
}
  from "react-router-dom";
class App extends React.Component {
  state = {
    status: true
  }
  buy = () => {
    this.setState({
      status: !this.state.status
    })
  }
  render() {
    return (
      <div>
       <TickerList /> 
        <button onClick={this.buy}>okey</button>
        {this.state.status ? <BuyStock price={88.07} openCloseFunction={this.buy} code='NKE' currentBalance={100000} name='Nike' /> : null}
      <Footer/>
      </div>
    )
  }
}

export default App;
