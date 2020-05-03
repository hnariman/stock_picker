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
    width: 170px;
    position: absolute;
  }
  &:hover{
    color: #ffdc40;
    border-bottom: 2px solid black;
    text-decoration: none;
    width: 170px;
    position: absolute;
  }
  &{
    color: black;
    font-family: "Roboto";
    font-size: 20px;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 40px;
    margin-right: -44px;
    vertical-align: middle;
    position: absolute;
  }`;
const Navigation = styled.a` 
    font-family: "Roboto";
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
`
const mainHeader = {
  'textAlign': "center",
  'display': "flex",
  'paddingTop': "20px",
  'justifyContent': "space-between",
  'height': '100px',
  'boxShadow': "0px 4px 6px rgba(0, 0, 0, 0.15)",

}
const image = {
  'marginTop': "10px",
  'marginRight': "70px",
}
const NavigationLink = styled.div`
    padding-bottom: 15px;
    margin-left: 50px;
    margin-right: 128px;
`;
class Navbar extends React.Component {
  render = () => {
    return (
      <div>
        <header style={mainHeader}>
          <Navigation>
            <NavigationLink>
              <StyledLink exact to={"/Account"}> Account </StyledLink>
            </NavigationLink>
            <NavigationLink>
              <StyledLink to={"/Stock"}> Stock </StyledLink> </NavigationLink>
          </Navigation>
          <div>
            <img style={image} alt="bank" src={bank} />
          </div>

        </header>

      </div>
    );
  };
}
export default Navbar;