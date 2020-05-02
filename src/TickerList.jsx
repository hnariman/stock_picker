import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Decimal from './Decimal.jsx';
import './paginate-style.css';

class TickerList extends React.Component {
  state = {
    pageNum: 1,
    items: 20,
    stockNet: [],
    stockArr: [],
    stockArrLength: null
  }

  formatMe = x => Number(x).toFixed(2);

  switchPage = e => {
    this.setState({ pageNum: e.selected + 1 });
  }

  componentDidMount() {
    console.log('hello')
    this.takeOurFetchNet();
  }

  takeOurFetchNet = () => {
    fetch('https://financialmodelingprep.com/api/v3/company/stock/list',
      { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        this.setState({
          stockNet: res.symbolsList,
          stockArrLength: res.symbolsList.length
        })
      })
  }

  render() {
    const { items, stockArr, stockNet, stockArrLength } = this.state;
    return (
      <section>
        <div>{stockNet.slice(this.state.items * (this.state.pageNum - 1), this.state.pageNum * this.state.items).map(each =>
          <Ticker key={each.code}>
            <Detail> {each.symbol} </Detail>
            <Detail> {each.name} </Detail>
            <Detail> {each.price} </Detail>
          </Ticker>
        )}
        </div>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'.'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(stockArrLength / items)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={1}
          onPageChange={this.switchPage}
          containerClassName={'container'}
          subContainerClassName={'subcontainer '}
          activeClassName={'active'}
        />
      </section>
    )
  }
}

const Ticker = styled.ul`
  margin:2px auto;
  width: 40vw;
  height:10vh;
  line-height:10vh;
  border:1px solid black;
  &:hover{ background:#ffcccc; } `;
const Detail = styled.li` display: inline-block; margin-right: 50px; `;

export default TickerList;