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
   justify-content: space-between;
   height:60vh;
`

const HeaderBuyStock = styled.div`
    display: flex;
    justify-content:space-between;
    padding:0 20px 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
    `
const BackButton = styled(NavLink)`
    width: 15.10vw;
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
    color: #2FC20A;
    min-width:21.7vw;
    text-align:center;

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
`
const TotlaPriceStoks = styled.div`
    height: 1.57vh;
    font:normal normal 20px Roboto;
    text-align: center;
    color: #000000;
    -webkit-user-select: none;
`
const СountStocks = styled.input`
    font: normal 200 64px Roboto;
    width: 13vw;
    text-align: center;
    color: #833AE0;
    border:none;
    outline:none;
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
    'width': "15.10vw",
    'height': "7vh",
}

class BuyStock extends React.Component {
    state = {
        countStocks: 1,
        ticker: '',
        price: '',
        name: ''
    }
    static propTypes = {
        price: PropTypes.number
    }

    componentDidMount() {
        const { ticker, price, name } = this.props.location.state;
        this.setState({
            ticker: ticker,
            price: price,
            name: name
        })
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
    handleInputChange = (evt) => {
        this.setState({
            countStocks: +evt.target.value
        })
    }
    sendInfoToApi = (result) => {
        const currentBalance = this.props.currentBalance
        const newCurrentBalance = currentBalance - result
        if (newCurrentBalance > 0 && result > 0) {
            fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ticker: this.state.ticker,
                    name: this.state.name,
                    code: this.props.code,
                    amount: this.state.countStocks,
                    purchasePrice: result
                })
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log('hello')
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
                    this.props.refreshBalance(newCurrentBalance);
                } else {
                    alert('Проблемы с сервером')
                }
            })
        } else {
            alert('Пополните баланс')
        }
    }
    deleteApi = () => {
        // fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks/398', {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "name": "Team one",
        //         "currentBalance": 100000

        //     })
        // })
    }
    render() {
        const { countStocks, ticker, price } = this.state;
        const result = countStocks * price;
        return (
            <BuyStockBlock>
                {/* <button onClick={this.deleteApi}></button> */}
                <HeaderBuyStock>
                    <BackButton to={"/Stock"}><LeftOutlined />  Back</BackButton>
                    <TitleStock>Buy {ticker}</TitleStock>
                    <div style={{ width: '15.10vw' }}></div>
                </HeaderBuyStock>
                <PriceStoks><Decimal number={price} /></PriceStoks>
                <СountStocksBlock>
                    <MinusOutlined onClick={() => this.handleClickChangeCountStocks(-1)} style={countStocksButtonStyle} />
                    <СountStocks value={countStocks} onChange={this.handleInputChange} />
                    <PlusOutlined onClick={() => this.handleClickChangeCountStocks(+1)} style={countStocksButtonStyle} />
                </СountStocksBlock>
                <TotlaPriceStoks>Buy for <Decimal number={result} /></TotlaPriceStoks>
                <SubmitButton to={"/Stock"}><Button onClick={() => { this.sendInfoToApi(result); }} type='primary' shape='round' size='large' style={submitButtonStyle}>Buy</Button></SubmitButton>
            </BuyStockBlock>
        )
    }
}
export default BuyStock
