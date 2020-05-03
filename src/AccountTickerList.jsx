import React from 'react';
import BuyStock from './BuyStock.jsx';
import Footer from './Footer';
import Decimal from './Decimal.jsx';
import Navbar from "./Navbar";
import Progres from './Progres'
import ReactPaginate from 'react-paginate';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';


class AccountTickerList extends React.Component {

    state = {
        pageNum: 1,
        portfolio: [],
        balance: 0,
        items: 20,
        stockArrLength: null,
    }
    componentDidMount() {
        this.getPortfolio();
    };

    getPortfolio = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks')
            .then(res => res.json())
            .then(res => this.setState({ portfolio: res, stockArrLength: res.length }))
            .catch(err => console.log(err))
    }


    render() {
        const { items, portfolio, stockArrLength } = this.state;
        portfolio.balance = this.state.balance;
        return (
            <section>
                <ScroolDiv>
                    {portfolio.slice(this.state.items * (this.state.pageNum - 1), this.state.pageNum * this.state.items).map(each =>
                        <Ticker key={each.id}>
                            <div style={tdSymbol}> {each.ticker} </div>
                            <div style={tdName} > {each.name} </div>
                            <div style={tdAmount} > {each.amount}pcs </div>
                            <div style={tdPurchasePrice} > {each.purchasePrice.toFixed(2)}$</div>
                            <div><Progres ticker={each.ticker} price={(+each.purchasePrice / +each.amount).toFixed(2)} /></div>
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
height: 45vh; 
padding: 5px; 
width: 1010px;
font-family: "Roboto";
margin: 20px auto 0px;
${'' /* 'width': "1005px" */}
&::-webkit-scrollbar {
  width: 0px;
    }
`;
const Ticker = styled.div`
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
    'width': "500px",
    'textAlign': "left"
}
const tdAmount = {
    'color': "#000000",
    'fontSize': "22px",
    'width': "200px",
    'textAlign': "center"
}
const tdPurchasePrice = {
    'color': "#000000",
    'fontSize': "22px",
    'width': "200px",
    'textAlign': "center"
}
const priceDecimal = {
    'fontSize': "20px"
}

export default AccountTickerList;