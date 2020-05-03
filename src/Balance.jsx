import React from 'react';
import PropTypes from 'prop-types';
import Progres from './Progres'

class Balance extends React.Component {
    state = {
        ticker: ''
    }
    componentDidMount() {
        this.tickerTake()
    }
    tickerTake = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks')
            .then(res => res.json())
            .then(date => {
                const arr = date.map(info => info.ticker);
                this.setState({
                    ticker: arr.toString()
                })
            })
    }

    render() {
        return (
            // <div>{this.state.ticker !== '' ? <Progres ticker={this.state.ticker} balance={this.props.balance} /> : null}</div>
            <div></div>
            )
    }
}
export default Balance