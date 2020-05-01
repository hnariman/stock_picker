import React from "react";
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import bank from "./images/Bank-icon.png";
import "./styles.css";

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #833ae0;
    border-bottom: 2px solid #833ae0;
  text-decoration: none;
  }
`;
const Navigation = styled.a` 
// margin-top: 20px;
font-family: "Roboto";
font-size: 20px;
float: left;
// text-decoration: none;
display: flex;
`
const mainHeader = {
  'textAlign': "center",
  'display': "inlineBlock",
  'height': '111px',
  'boxShadow': "0px 4px 6px rgba(0, 0, 0, 0.15)"
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
