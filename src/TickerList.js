import React from 'react';
import styled from 'styled-components'
import json from './data.json';
{/* import PropTypes from 'prop-types'; */}
{/* import ReactPaginate from 'react-paginate'; */}
{/* import Decimal from './Decimal.js'; */}

class TickerList extends React.Component {
  // fetch(query)
  //   .then((response) => { return response.json(); })
  //   .then((data) => { 
  //     this.setState({
  //       ticker: data.symbol,
  //       companyName: data.profile.companyName,
  //       price: data.profile.price,
  //     });
  //   })
  //   .catch((error) => {
  //     this.setState({ tickerFound: false })
  //   })
  static defaultProps = {
    data :  [ 
      { 
        'id': '1', 
        'userId': '1', 
        'code': 'AAPL', 
        'amount': '3', 
        'purchasePrice': '125.00' }, 
      { 
        'id': '2', 
        'userId': '2', 
        'code': 'NKE', 
        'amount': '1', 
        'purchasePrice': '737.00' }
    ]
  }
  state = { pageNum:1, items:4 }
  formatMe = (x) => { return Number(x).toFixed(2);}
  render(){
    // console.log(Object.entries(json).map(x => x).map(x => x));
  const {items, pageNum} = this.state;
    return(
      <section className='tickerList'>
        <div className='results'>{this.props.data.slice(items * (pageNum-1), pageNum * items)
            .map( each =>
            <Ticker   className='each-ticker' key={each.code}>
              <Detail className='code'   > {each.code} </Detail>
              <Detail className='company'> Company Name Inc. </Detail>
              <Detail className='amount' > {each.amount} pcs </Detail>
              <Detail className='price'  > {this.formatMe(each.purchasePrice)}$ </Detail>
              <Detail className='change' > daily change % </Detail>

              {/* <Detail className='code'   ><Decimal value={each.code} /></li> */}
              {/* <Detail className='company'> Company Name Inc.</Detail > */}
              {/* <Detail className='amount' ><Decimal value={each.amount} /></Detail > */}
              {/* <Detail className='price'  ><Decimal value={each.purchasePrice} /></Detail > */}
              {/* <Detail className='change' ><Decimal value={each.change} /></Detail > */}
            </Ticker> 
            )}
          </div>
          <Pages className='pages'>
            <Page onClick={() => this.setState({pageNum: 1})}>{pageNum}</Page>
            <Page onClick={() => this.setState({pageNum: 2})}>{pageNum}</Page>
            <Page onClick={() => this.setState({pageNum: 3})}>{pageNum}</Page>
            <Page onClick={() => this.setState({pageNum: 4})}>{pageNum}</Page>
          </Pages>
        {/* <ReactPaginate */}
        {/*   previousLabel={'previous'} */}
        {/*   nextLabel={'next'} */}
        {/*   breakLabel={'...'} */}
        {/*   breakClassName={'break-me'} */}
        {/*   pageCount={this.state.pageCount} */}
        {/*   marginPagesDisplayed={2} */}
        {/*   pageRangeDisplayed={5} */}
        {/*   onPageChange={this.handlePageClick} */}
        {/*   containerClassName={'pagination'} */}
        {/*   subContainerClassName={'pages pagination'} */}
        {/*   activeClassName={'active'} */}
        {/* /> */}
        </section>
    )
  }
}

const Page = styled.button`
  font-size:1.2rem;
  border:none;
  background: white;
  cursor:pointer;
  &:hover{ opacity:0.5; } `;
const Ticker = styled.ul`
  margin:2px auto;
  width: 40vw;
  height:18vh;
  line-height:18vh;
  border:1px solid black;
  &:hover{ background:#ffcccc; } `;
const Detail = styled.li` display: inline-block; margin-right: 50px; `;
const Pages = styled.ul` width:10vw; margin: 0 auto; `;

export default TickerList;
