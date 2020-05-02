import React from "react";
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import bank from "./img/Bank-icon.png";

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #833ae0;
    border-bottom: 2px solid #833ae0;
    text-decoration: none;
  }
  &:hover{
    color: #ffdc40;
    border-bottom: 2px solid black;
    text-decoration: none;
  }
  &{
    color: black;
    font-family: "Roboto";
    font-size: 20px;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 5px;
    margin-right: -23px;
  }
`;
const Navigation = styled.a` 
    font-family: "Roboto";
    font-size: 20px;
    float: left;
    display: flex;
`
const mainHeader = {
    'textAlign': "center",
    'display': "inlineBlock",
    'height': '75px',
}
const image = {
    'marginTop': "30px",
    'float': "right",
    'marginRight': "50px"
}
const divLink = styled.div`
&:hover{
  color: #ffdc40;
  border-bottom: 2px solid black;
  cursor: pointer;
}
`
const navigationLink = {
    'fontSize': "20px",
    'float': "left",
    'textDecoration': "none",
    'fontWeight': "500",
    'borderBottom': "2px solid transparent",
    'color': "black",
    'marginLeft': "30px",
    'marginTop': "25px",
    'paddingBottom': '15px',
    'margin-left': '50px'
}

class Navbar extends React.Component {
    render = () => {
        return (
            <header style={mainHeader}>
                <Navigation>
                    <div className="divLink" style={navigationLink}>
                        <StyledLink exact to={"/Account"}>
                            Account
                </StyledLink>
                    </div>
                    <div style={navigationLink} className="divLink">
                        <StyledLink to={"/Stock"}>
                            Stock
                </StyledLink>
                    </div>
                </Navigation>
                <img style={image} alt="bank" src={bank} />
            </header >
        );
    };
}
export default Navbar;