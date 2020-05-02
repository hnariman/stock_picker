import React from 'react';
import PropTypes from 'prop-types';
import Decimal from './Decimal.jsx';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { PlusOutlined, MinusOutlined, LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BuyStockBlock = styled.div`
   display:flex;
   flex-direction:column;
   justify-content: space-around;
   min-height:400px;
   height:80vh;
`

const HeaderBuyStock = styled.div`
    display: flex;
    justify-content: space-around;
    align-items:center;
    padding:0 20px 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
`
const BackButton = styled(NavLink)`
    width: 174px;
    padding: 20px 0;
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

const SubmitButton = styled(NavLink)`
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
        if (newCurrentBalance > 0 && result > 0) {
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
            this.props.refreshBalance(newCurrentBalance);
        }
    }
    deleteApi = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks/104', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    render() {
        const { countStocks } = this.state;
        const { name, price } = this.props;
        const result = countStocks * price;
        return (
            <BuyStockBlock>
                {/* <button onClick={this.deleteApi}></button> */}
                <HeaderBuyStock>
                    <BackButton to={"/Account"}><LeftOutlined />  Back</BackButton>
                    <TitleStock>Buy {name}</TitleStock>
                </HeaderBuyStock>
                <PriceStoks><Decimal number={price} /></PriceStoks>
                <СountStocksBlock>
                    <MinusOutlined onClick={() => this.handleClickChangeCountStocks(-1)} style={countStocksButtonStyle} />
                    <СountStocks >{countStocks}</СountStocks>
                    <PlusOutlined onClick={() => this.handleClickChangeCountStocks(+1)} style={countStocksButtonStyle} />
                </СountStocksBlock>
                <TotlaPriceStoks>Buy for <Decimal number={result} /></TotlaPriceStoks>
                <SubmitButton to={"/Account"}><Button onClick={() => { this.sendInfoToApi(result); }} type='primary' shape='round' size='large' style={submitButtonStyle}>Buy</Button></SubmitButton>
            </BuyStockBlock>
        )
    }
}
export default BuyStock
