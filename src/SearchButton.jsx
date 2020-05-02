import React from 'react';
import 'antd/dist/antd.css';
import styled from "styled-components";
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

    getCompanyInfo = (evt) => {
        this.setState({ tickerFound: true })
        const ticker = evt.target.value;
        const query = `https://financialmodelingprep.com/api/v3/company/profile/${ticker}`;
        if (ticker.length > 0) {
            fetch(query)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        ticker: data.symbol,
                        companyName: data.profile.companyName,
                        price: data.profile.price,
                    });
                })
                .catch((error) => {
                    this.setState({ tickerFound: false })
                })
        }
    }

    render() {
        return (
            <div>
                <InputCSS>
                    <ZoomIcon>
                        <img src={Zoom} alt='search button' />
                    </ZoomIcon>
                    <div>
                        <Input placeholder="enter company ticker" onBlur={this.getCompanyInfo} />
                    </div>
                </InputCSS>
                {this.state.tickerFound ?
                    <p>{this.state.ticker} - <span> - {this.state.companyName} - </span> - {this.state.price}$</p>
                    : <p>not found</p>}
            </div>
        );
    }
}

export default SearchButton;