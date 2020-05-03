import React from 'react';
import PropTypes from 'prop-types';

class Progres extends React.Component {
    state = {
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
                const value = (data.profile.price - this.props.price).toFixed(2);
                const changesValue = (100 - ((this.props.price * 100) / data.profile.price)).toFixed(2)
                this.setState({
                    changes: value,
                    changesPercentage: changesValue
                });
            })
    }
    render() {
        const { changes, changesPercentage } = this.state
        return (
            <div>{`${changes} (${changesPercentage})%`}</div>
        )
    }
}
export default Progres