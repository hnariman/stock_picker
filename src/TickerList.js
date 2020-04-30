import React from 'react';
import './TickerList.css';

const data =  [ 
  { 
    "id": "1", 
    "userId": "1", 
    "code": "AAPL", 
    "amount": "3", 
    "purchasePrice": "125.00" }, 
  { 
    "id": "1", 
    "userId": "1", 
    "code": "AAPL", 
    "amount": "3", 
    "purchasePrice": "125.00" }, 
  { 
    "id": "2", 
    "userId": "2", 
    "code": "NKE", 
    "amount": "1", 
    "purchasePrice": "737.00" }
]

class TickerList extends React.Component {
  state = { pageNum:1, items:4 }
  formatMe = (x) => { return Number(x).toFixed(2);}
  render(){
  const {items, pageNum} = this.state;
    return(
      <div className="tickerList">
        <div>{data.slice(items * (pageNum-1), pageNum * items)
            .map( each =>
            <ul className='each-ticker' key={each.code}>
              <li className="code"   > {each.code} </li>
              <li className="company"> Company Name Inc. </li>
              <li className="amount" > {each.amount} pcs </li>
              <li className="price"  > {this.formatMe(each.purchasePrice)}$ </li>
              <li className="change" > daily change % </li>
            </ul> 
            )}
          </div>
          <ul className="pages">
            <li><button onClick={this.switchPage}>{pageNum}</button></li>
            <li><button onClick={this.switchPage}>{pageNum+1}</button></li>
            <li><button onClick={this.switchPage}>{pageNum+2}</button></li>
          </ul>
      </div>
    )
  }
}

export default TickerList;
