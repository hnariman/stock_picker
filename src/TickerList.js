import React from 'react';
import styled from 'styled-components'
import json from './data.json';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Decimal from './Decimal.jsx';
import './paginate-style.css';

class TickerList extends React.Component {
  state      = { pageNum:1, items:20 }
  formatMe   = x => Number(x).toFixed(2);
  switchPage = e => this.setState({pageNum: e.selected});
  render() {
    const {items, pageNum} = this.state;
    const data = json.symbolsList.map(x => x);
    return(
      <section>
        <div>{data.slice(items * (pageNum-1), pageNum * items)
            .map( each =>
            <Ticker   key={each.code}>
              <Detail> {each.symbol} </Detail>
              <Detail> {each.name} </Detail>
              <Detail> {each.price} </Detail>
              {/* <Detail className='code'   ><Decimal value={each.symbol} /></Detail> */}
              {/* <Detail className='company'>{each.name}</Detail> */}
              {/* <Detail className='amount' ><Decimal value={each.amount} /></Detail> */}
              {/* <Detail className='price'  ><Decimal value={each.purchasePrice} /></Detail> */}
              {/* <Detail className='change' ><Decimal value={each.change} /></Detail> */}
            </Ticker> 
            )}
          </div>
          {/* https://www.npmjs.com/package/react-paginate */} 
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'.'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(data.length/items)}
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
