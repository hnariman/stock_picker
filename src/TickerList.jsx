import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Decimal from './Decimal.jsx';
import { NavLink } from 'react-router-dom';
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
    const { items, stockNet, stockArrLength } = this.state;
    console.log(stockNet)
    return (
      <section>

        <ScroolDiv>{stockNet.slice(this.state.items * (this.state.pageNum - 1), this.state.pageNum * this.state.items).map(each =>
          <Ticker to={{ pathname: "/BuyStock", state: { ticker: each.symbol, price: each.price } }} key={each.code}>
            <div style={tdSymbol}> {each.symbol} </div>
            <div style={tdName} > {each.name} </div>
            <div style={tdPrice}><span style={priceDecimal} ><Decimal number={each.price} /></span></div>
          </Ticker>
        )}
        </ScroolDiv>
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


const ScroolDiv = styled.div`
overflow: scroll; 
overflow-x: hidden; 
height: 60vh; 
padding: 5px; 
&::-webkit-scrollbar {
  width: 0px;
    }
`;

const Ticker = styled(NavLink)`
  margin:2px auto;
  width: 40vw;
  height: 70px;
  line-height:10vh;
  border-bottom: 1px dashed #E0E0E0;
  padding: 20px 30px;
  display:flex;
  justify-content: space-between;
    align-items:center;
    &:hover{
    background: rgba(131, 58, 224, 0.05); `;


const tdSymbol = {
  'color': "rgba(0, 0, 0, 0.5)",
  'fontSize': "12px",
  'marginLeft': "-16px",
  'width': "66px"
}
const tdName = {
  'color': "#000000",
  'fontSize': "22px",
  'width': "800px",
  'textAlign': "left"
}
const tdPrice = {
  'color': "#000000",
  'fontSize': "30px",
  'marginTop': "-10px",
  'width': "150px",
  'textAlign': "right"
}
const priceDecimal = {
  'fontSize': "20px"
}

export default TickerList;