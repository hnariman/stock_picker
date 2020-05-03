import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StokeTickerList from './StockTickerList.jsx';
import SearchButton from './SearchButton.jsx';

class Stock extends React.Component {
    state = {
        status: true
    }
    statusChange = (stat) => {
        this.setState({
            status: stat
        })
    }
    render() {
        return (
            <div>
                <div style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)", height: '5px' }}></div>
                <SearchButton status={this.statusChange} />
                {this.state.status ? <StokeTickerList /> : null}
            </div>
        );
    }
}
export default Stock