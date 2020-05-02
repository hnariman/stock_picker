import React from 'react';
import 'antd/dist/antd.css';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import Zoom from './img/zoom.png';


const InputCSS = styled.div`
    margin: 0 auto;
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
    //  background-color: black; 
    width: 200px;
    margin-top: 10px;
    margin-left: 18px;
    outline: none;
    text-align: center;
    font-size: 33px;
    line-height: 34px;
    color: #833AE0;
    border: none;
    &:hover {
        opacity: 0.8;
    }    
    &::placeholder {
        font-size: 20px;
      }    
`;

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
        value == '' ? status(true) : status(false);
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
                    <div>
                        <Input placeholder="enter company ticker" onChange={this.handlerChange} />
                    </div>
                </InputCSS>
                {(this.state.ticker !== '') ? <div>
                    {this.state.tickerFound ?
                        <NavLink to={{ pathname: "/BuyStock", state: { ticker: this.state.ticker, price: this.state.price } }}>{this.state.ticker} <span>{this.state.companyName}</span>{this.state.price}$</NavLink>
                        : <p>not found</p>}
                </div> : null}
            </div>
        );
    }
}

export default SearchButton;