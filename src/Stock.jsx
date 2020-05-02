import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TickerList from './TickerList.jsx';
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
                <SearchButton status={this.statusChange} />
                {this.state.status ? <TickerList /> : null}
            </div>
        );
    }
}
export default Stock