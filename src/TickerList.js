import React from 'react';
import styled from 'styled-components'
{/* import Decimal from './Decimal.js'; */}

class TickerList extends React.Component {
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
            <Page onClick={this.switchPage}>{pageNum}</Page>
            <Page onClick={this.switchPage}>{pageNum+1}</Page>
            <Page onClick={this.switchPage}>{pageNum+2}</Page>
          </Pages>
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
