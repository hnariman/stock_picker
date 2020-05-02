import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TickerList from './TickerList.jsx';
import SearchButton from './SearchButton.jsx';

class Stock extends React.Component {
    state = {
        status: true
    }
    render() {
        return (
            <div>
                <SearchButton />
                {this.state.status ? <TickerList /> : null}
            </div>
        );
    }
}
export default Stock