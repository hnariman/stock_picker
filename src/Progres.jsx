import React from 'react';
import PropTypes, { number } from 'prop-types';
import Decimal from './Decimal';

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
        fetch(`https://financialmodelingprep.com/api/v3/company/profile/${ticker}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (!data.companyProfiles) {
                    const value = (data.profile.price - this.props.price).toFixed(2);
                    const changesValue = (100 - ((this.props.price * 100) / data.profile.price)).toFixed(2)
                    this.setState({
                        changes: value,
                        changesPercentage: changesValue
                    });
                } else {
                    const newDat = data.companyProfiles;
                    const arr = [];
                    for (let i = 0; i < newDat.length; i++) {
                        arr.push(newDat[i].profile.price * this.props.amount[i]);
                    }
                    const oldBalance = this.props.balance;
                    const totalBalance = (oldBalance - +arr.reduce((a, b) => { return a + b })).toFixed(2);
                    const changesBalance = (totalBalance * 100) / this.props.balance;
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
        console.log(balance)
        return (
            <div>
                {balance ? <Decimal number={oldBalance} /> : null}
                <div>{changes}$</div>
                <div>{changesPercentage}%</div>
            </div>
        )
    }
}
export default Progres