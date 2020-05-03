import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Decimal from './Decimal.jsx';
import { NavLink } from 'react-router-dom';
import './paginate-style.css';

class StokeTickerList extends React.Component {
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
    return (
      <section>

        <ScroolDiv>{stockNet.slice(this.state.items * (this.state.pageNum - 1), this.state.pageNum * this.state.items).map(each =>
          <Ticker to={{ pathname: "/BuyStock", state: { ticker: each.symbol, price: each.price, name: each.name } }} key={each.code}>
            <div style={tdSymbol}> {each.symbol} </div>
            <div style={tdName} > {each.name} </div>
            <div style={tdPrice}><span style={priceDecimal} ><Decimal number={each.price} /></span></div>
          </Ticker>
        )}
        </ScroolDiv>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'.'}
          breakClassName={'...'}
          pageCount={Math.ceil(stockArrLength / items)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
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
height: 40vh; 
padding: 5px; 
width: 1010px;
font-family: "Roboto";
margin: 50px auto;
&::-webkit-scrollbar {
  width: 0px;
    }
`;
const Ticker = styled(NavLink)`
  height: 70px;
  border-bottom: 1px dashed #E0E0E0;
  padding: 20px 30px;
  width: 1005px;
  display: flex;
  justify-content: space-between;
  &:hover{
  background: rgba(131, 58, 224, 0.05);
} `;
const tdSymbol = {
  'color': "rgba(0, 0, 0, 0.5)",
  'fontSize': "12px",
  'marginLeft': "-16px",
  'width': "66px",
  'marginTop': "auto"
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

export default StokeTickerList;
