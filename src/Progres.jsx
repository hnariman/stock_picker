import React from 'react';
import PropTypes, { number } from 'prop-types';
import Decimal from './Decimal';
import greenArrow from '../src/img/greenArrow.png';
import redArrow from '../src/img/redArrow.png';
import styled from 'styled-components';

class Progres extends React.Component {
    state = {
        oldBalance: null,
        changes: '',
        changesPercentage: ''
    }
    componentDidMount() {
        this.takeTickerPrice()
    }
    takeTickerPrice = () => {
        const { ticker } = this.props;
        fetch(`https://financialmodelingprep.com/api/v3/quote/${ticker}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.length === 1) {
                    const value = (data[0].price - this.props.price).toFixed(2);
                    const changesValue = (100 - ((+this.props.price * 100) / +data[0].price)).toFixed(2)
                    this.setState({
                        changes: value,
                        changesPercentage: changesValue
                    });
                } else {
                    const newDat = data;
                    const arr = [];
                    for (let i = 0; i < newDat.length; i++) {
                        arr.push(newDat[i].price * this.props.amount[i]);
                    }
                    const oldBalance = this.props.balance;
                    const totalBalance = (oldBalance - +arr.reduce((a, b) => { return a + b })).toFixed(2);
                    console.log(totalBalance)
                    const changesBalance = ((totalBalance * 100) / this.props.balance).toFixed(2);
                    this.setState({
                        oldBalance: oldBalance,
                        changes: totalBalance,
                        changesPercentage: changesBalance
                    })
                }
            })
    }
    render() {
        const { oldBalance, changes, changesPercentage } = this.state
        const balance = oldBalance == null ? false : true;
        const status = changes > 0 ? priceUp : changes < 0 ? priceDown : null;
        return (
            <ProgresBlock>
                {balance ? <Decimal number={oldBalance} /> : null}
                <div style={{ ...tdArrowPrice, ...status }}>
                    <div >{changes > 0 ? <img src={greenArrow} /> : (changes > 0) ? <img src={redArrow} /> : null}{changes}$</div>
                    <div>({changesPercentage}%)</div>
                </div>
            </ProgresBlock>
        )
    }
}
const tdArrowPrice = {
    'color': "#000",
    'fontSize': "18px",
    'fontWeight': "normal",
    'justify-content': "space-around",
    'display': "flex",
    'align-items': 'center',
    'width': '170px',
}
const priceDown = {
    'color': "#FF2C2C",

}
const priceUp = {
    'color': "#2FC20A",
}
const ProgresBlock = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
`
export default Progres