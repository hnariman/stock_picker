import React, { Component } from 'react';
import styled from "styled-components";
import Decimal from './Decimal';
const FooterCSS = styled.div`
    font-family: 'Roboto', sans-serif;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%; 
    display: flex;
    justify-content: space-between;
    height: 9.5vh;
    line-height: 10vh;
    background: #833AE0; 
    text-align: center;
    letter-spacing: 0.03em;
    color: #FFDC40;
`;

const FooterHeight = styled.div`
height: 9.5vh;
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

const TeamCSS = styled.div`
    width: 300px;
    font-size: 12px;
    line-height: 15px;
    color: #833AE0;
`;

const FooterRemainCSS = styled.span`
    font-size: 26px;
`;

class Footer extends Component {

    render = () => {
        const { currentBalance } = this.props
        return (
            <FooterHeight>
                <FooterCSS>
                    <FooterBalanceCSS>Balance:</FooterBalanceCSS>
                    <FooterAmountCSS><Decimal number={currentBalance} /></FooterAmountCSS>
                    <TeamCSS>
                        Nariman Huseynov<br />
                Sabina Huseynova<br />
                Chingiz Shigayev<br />
                Team Lead: Shahriyar Mirzai-Sefidi
                </TeamCSS>
                </FooterCSS>
            </FooterHeight>
        );
    }
}
export default Footer;