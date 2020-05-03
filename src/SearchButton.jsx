import React from 'react';
import 'antd/dist/antd.css';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import Zoom from './img/zoom.png';
import Decimal from './Decimal.jsx';
import { AutoComplete } from 'antd';

const InputCSS = styled.div`
    margin: 33px auto;
    display: flex;
    flex-direction: row;
    width: 360px;
    height: 60px;
    background-color: #F3F3F3;
    border-radius: 94px;
    &:hover {
        opacity: 0.8;
    }
`;

const Input = styled.input`
    background-color: #F3F3F3; 
    width: 200px;
    outline: none;
    text-align: center;
    font-size: 25px;
    color: #833AE0;
    border: none;
    width: 100%;
    margin: 0 auto;
    padding-right: 37px;
::placeholder{
    text-align: center;
}    
margin: 0 auto;
}
    &:hover {
        opacity: 0.8;
    }    
    &::placeholder {
        font-size: 20px;
      }    
`;
const inputDiv = {
    'width': "270px",
    'marginTop': "8px"
}
const ZoomIcon = styled.div`
    padding: 18px;
`;

class SearchButton extends React.Component {
    state = {
        ticker: '',
        companyName: '',
        price: '',
        tickerFound: true,
    }

    timeOutId = null;


    handlerChange = (evt) => {
        const value = evt.target.value.toUpperCase();
        const { status } = this.props;
        if (value === '') {
            status(true)
            this.setState({
                ticker: value
            })
        } else {
            status(false);
        }
        clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => value ? this.getCompanyInfo(value) : this.setState({ ticker: value, tickerFound: false }), 500)
    }
    getCompanyInfo = (ticker) => {
        fetch(`https://financialmodelingprep.com/api/v3/company/profile/${ticker}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    ticker: (ticker == data.symbol) ? data.symbol : '',
                    companyName: data.profile.companyName,
                    price: data.profile.price,
                    tickerFound: true
                });
            })
            .catch((error) => {
                this.setState({ tickerFound: false, ticker: ticker, companyName: '', price: '', })
            })
    }

    render() {
        return (
            <div>
                <InputCSS>
                    <ZoomIcon>
                        <img src={Zoom} alt='search button' />
                    </ZoomIcon>
                    <div style={inputDiv}>
                        <Input placeholder="enter company ticker" onChange={this.handlerChange} />
                    </div>
                </InputCSS>
                {(this.state.ticker !== '') ? <div>
                    {this.state.tickerFound ?
                        <Ticker to={{ pathname: "/BuyStock", state: { ticker: this.state.ticker, price: this.state.price.toFixed(2), name: this.state.companyName } }}><div style={tdSymbol}>{this.state.ticker}</div><div style={tdName}>{this.state.companyName}</div><div style={tdPrice}><span style={priceDecimal} ><Decimal number={this.state.price} /></span></div></Ticker>
                        : <div style={notFound}>Not found</div>}
                </div> : null
                }
            </div>
        );
    }
}
const notFound = {
    'marginTop': "60px",
    'textAlign': "center",
    'fontSize': "22px",
    'fontFamily': "Roboto",
    'color': "black"
}
const Ticker = styled(NavLink)`
  height: 70px;
  border-bottom: 1px dashed #E0E0E0;
  padding: 20px 30px;
  width: 1005px;
  margin: auto;
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

export default SearchButton;