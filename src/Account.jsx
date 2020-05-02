import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Account extends React.Component {
  state = {
    ourStock: [],
    page: [],
    pageNow: 1,
    pageIndex: 3
  }
  componentDidMount() {
    this.takeOurFetchNet();
  }
  takeOurFetchNet = () => {
    fetch('https://financialmodelingprep.com/api/v3/company/stock/list',
      { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        const arr = [];
        for (let i = 0; i < res.symbolsList.length / 20; i++) {
          arr.push(i)
        }
        console.log(arr);
        this.setState({
          ourStock: res,
          page: arr
        })
      })

  }
  changeOnePage(page) {
    if (this.state.pageNow + page > 0 && this.state.pageNow + page < this.state.page.length) {
      this.setState({
        pageNow: this.state.pageNow + page
      })
    }
  }
  changePage = (e) => {
    const number = +e.target.innerHTML;
    const { page, pageNow, } = this.state;
    console.log(number);
    if (number < page.length - 2 && number > 3) {
      this.setState({
        pageIndex: number - 1,
        pageNow: number
      })
    } else {
      this.setState({
        pageNow: number
      })
    }
  }
  resetPage = (page, index) => {
    this.setState({
      pageIndex: index,
      pageNow: page
    })
  }

  render() {
    const { ourStock, page, pageIndex, pageNow } = this.state;
    const pageIndexTwo = pageIndex + 1;
    const pageIndexThree = pageIndexTwo + 1;
    const arr = ourStock.symbolsList;
    // const block = (arr !== undefined) ? arr.slice(0, 10).map(card => {
    //   return <div>{card.name}</div>
    // }) : null;
    return (
      <div>
        <div>{pageIndex}-Index,{pageNow}-Page</div>
        <div>
          <button onClick={() => this.changeOnePage(-1)}>{`<`}</button>
          <button onClick={() => this.resetPage(1, 3)}>1</button>
          <button onClick={() => this.resetPage(2, 3)}>2</button>
          {pageNow > 4 ? <button>...</button> : null}
          <button onClick={this.changePage}>{page[pageIndex]}</button>
          <button onClick={this.changePage}>{page[pageIndexTwo]}</button>
          <button onClick={this.changePage}>{page[pageIndexThree]}</button>
          {(pageNow < (page.length - 2)) ? <button>...</button> : null}
          <button onClick={() => this.resetPage(page.length - 1, page.length - 4)}>{page[page.length - 1]}</button>
          <button onClick={() => this.changeOnePage(+1)}>{`>`}</button>
        </div>
      </div>
    );
  }
}

export default Account;