import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DecimalBlock = styled.span`
    font-size: 1.4em;
`
class Decimal extends React.Component {
    prettify = (num) => {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }
    render() {
        const { number } = this.props;
        const decimal = (number - Math.floor(number)) * 100;
        const numberFloor = Math.floor(number);
        return (
            <span><DecimalBlock>{this.prettify(numberFloor)}</DecimalBlock>.{decimal.toFixed()}$</span>
        )
    }
}
export default Decimal;