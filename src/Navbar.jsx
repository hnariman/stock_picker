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
    width: 14.75vw;
    position: absolute;
  }
  &:hover{
    color: #ffdc40;
    border-bottom: 2px solid black;
    text-decoration: none;
    width: 14.75vw;
    position: absolute;
  }
  &{
    color: black;
    font-family: "Roboto";
    font-size: 20px;
    text-decoration: none;
    font-weight: 500;
    padding: 1.42vh 3.47vw;
    margin-right: -3.81vw;
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
  'paddingTop': "2.85vh",
  'justifyContent': "space-between",
  'height': '17.7vh',
}
const image = {
  'marginTop': "3.57vh",
  'marginRight': "6.07vw",
}
const NavigationLink = styled.div`
    padding-bottom: 2.14vh;
    margin-left: 4.34vw;
    margin-right: 11.11vw;
`;
class Navbar extends React.Component {
  render = () => {
    return (
      <div>
        <header style={mainHeader}>
          <Navigation>
            <NavigationLink>
              <StyledLink exact to={"/"}> Account </StyledLink>
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