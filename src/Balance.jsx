import React from 'react';
import PropTypes from 'prop-types';
import Progres from './Progres'

class Balance extends React.Component {
    state = {
        ticker: '',
        amount: null,
        balance: null
    }
    componentDidMount() {
        this.tickerTake()
    }
    tickerTake = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/1/stocks')
            .then(res => res.json())
            .then(date => {
                const arrticker = date.map(info => info.ticker);
                const arrAmount = date.map(info => info.amount);
                const arrPurchasePrice = date.map(info => info.purchasePrice)
                const balance = arrPurchasePrice.reduce((a, b) => { return a + b })
                console.log(arrPurchasePrice)
                this.setState({
                    ticker: arrticker.toString(),
                    amount: arrAmount,
                    balance: balance
                })
            })
    }

    render() {
        return (
            <div>{this.state.ticker !== '' ? <Progres ticker={this.state.ticker} amount={this.state.amount} balance={this.state.balance} /> : null}</div>
        )
    }
}
export default Balance