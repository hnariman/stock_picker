import React, { Component } from 'react';
import styled from "styled-components";

const FooterCSS = styled.div`
    font-family: 'Roboto', sans-serif;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%; 
    display: flex;
    justify-content: space-between;
    height: 67px;
    line-height: 70px;
    background: #833AE0; 
    text-align: center;
    letter-spacing: 0.03em;
    color: #FFDC40;
`;

const FooterBalanceCSS = styled.div`
    width: 300px;  
    font-size: 22px;
    font-weight: bold;
`;

const FooterAmountCSS = styled.div`
    width: 300px;
    font-size: 36px;
`;

const FooterRemainCSS = styled.span`
    font-size: 26px;
`;

class Footer extends Component {
    state = {
        balance: '',
        remain: '',
    }

    handleBalance(data) {
        const beforeDot = data.currentBalance.toFixed(0);
        const afterDot = data.currentBalance.toFixed(2).toString();
        const remain = (afterDot.substring(afterDot.length - 3));
        this.setState({
            balance: beforeDot,
            remain: remain,
        });
    }

    callFetch() {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.handleBalance(data);
            });
    }

    render = () => {
        {this.callFetch()}
        return (
            <FooterCSS>
                <FooterBalanceCSS>Balance:</FooterBalanceCSS>
                <FooterAmountCSS>{this.state.balance}<FooterRemainCSS>{this.state.remain}$</FooterRemainCSS></FooterAmountCSS>
                <FooterAmountCSS></FooterAmountCSS>
            </FooterCSS>
        );
    }
}
export default Footer;