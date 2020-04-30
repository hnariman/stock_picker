import React from 'react';
import PropTypes from 'prop-types';
import Decimal from './Decimal.jsx';
// import {
//     BrowserRouter as Router, Route, NavLink
// } from "react-router-dom";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { PlusOutlined, MinusOutlined, LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BuyStockBlock = styled.div`
   display:flex;
   flex-direction:column;
   justify-content: space-around;
   border:1px solid red;
   min-height:500px;
   height:80vh;
`

const HeaderBuyStock = styled.div`
    display: flex;
    justify-content: space-around;
    align-items:center;
    padding:20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
`
const BackButton = styled.button`
    width: 174px;
    height: 48px;
    font:normal normal 24px Roboto;
    text-align: center;
    color: #833AE0;
    background: #FFFFFF;
    border:none;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
    -webkit-user-select: none;
`
const TitleStock = styled.div`
    font:normal normal 48px Roboto;
    text-align: left;
    color: #2FC20A;
    width:44%;
    min-width:250px;
    -webkit-user-select: none;
    `
const СountStocksBlock = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
`
const PriceStoks = styled.div`
    font:normal normal 20px Roboto;
    text-align: center;
    color: #000000;
    -webkit-user-select: none;
`
const TotlaPriceStoks = styled.div`
    height: 11px;
    font:normal normal 20px Roboto;
    text-align: center;
    color: #000000;
    -webkit-user-select: none;
`
const СountStocks = styled.div`
    font: normal 200 64px Roboto;
    padding:0 50px;
    text-align: center;
    color: #833AE0;
    -webkit-user-select: none;
`

const SubmitButton = styled.div`
    display:flex;
    justify-content: center;
`
const countStocksButtonStyle = {
    'font': "normal 200 36px Roboto",
    'textAlign': "center",
    'color': '#833AE0',
    'cursor': 'pointer'
}
const submitButtonStyle = {
    'font': "normal normal 24px Roboto",
    'background': "white",
    'color': "#833AE0",
    'width': "174px",
    'height': "49px",
    'border': "3px solid #833AE0"
}

class BuyStock extends React.Component {
    state = {
        countStocks: 1
    }
    static propTypes = {
        price: PropTypes.number
    }
    handleClickChangeCountStocks = (x) => {
        const { countStocks } = this.state;
        const value = x;
        const result = countStocks + value;
        (countStocks + x > -1) &&
            this.setState({
                countStocks: result
            });
    }
    sendInfoToApi = (result) => {
        const currentBalance = this.props.currentBalance
        const newCurrentBalance = currentBalance - result
        console.log(newCurrentBalance)
        if (newCurrentBalance > 0) {
            fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": "Team one",
                    "currentBalance": newCurrentBalance

                })
            })
            fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.props.code,
                    amount: this.state.countStocks,
                    purchasePrice: result
                })
            });
            this.restartBlock();
        }
    }
    restartBlock = () => {
        const { openCloseFunction } = this.props
        this.setState({
            countStocks: 1
        })
        openCloseFunction();

    }
    render() {
        const { countStocks } = this.state;
        const { name, price, openCloseFunction } = this.props;
        const result = countStocks * price;
        return (
            <BuyStockBlock>
                <HeaderBuyStock>
                    <BackButton onClick={() => openCloseFunction()}><LeftOutlined />  Back</BackButton>
                    <TitleStock>Buy {name}</TitleStock>
                </HeaderBuyStock>
                <PriceStoks><Decimal number={price} /></PriceStoks>
                <СountStocksBlock>
                    <MinusOutlined onClick={() => this.handleClickChangeCountStocks(-1)} style={countStocksButtonStyle} />
                    <СountStocks >{countStocks}</СountStocks>
                    <PlusOutlined onClick={() => this.handleClickChangeCountStocks(+1)} style={countStocksButtonStyle} />
                </СountStocksBlock>
                <TotlaPriceStoks>Buy for <Decimal number={result} /></TotlaPriceStoks>
                <SubmitButton><Button onClick={() => this.sendInfoToApi(result)} type='primary' shape='round' size='large' style={submitButtonStyle}>Buy</Button></SubmitButton>
            </BuyStockBlock>
        )
    }
}
export default BuyStock