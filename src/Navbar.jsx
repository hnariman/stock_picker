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
    display: flex;
`
const mainHeader = {
    'textAlign': "center",
    'display': "flex",
    'paddingTop': "20px",
    'justifyContent': "space-between",
    'height': '75px',
}


const image = {
    'marginTop': "10px",
    'marginRight': "70px",
}

const NavigationLink = styled.div`
    fontSize: 20px;
    textDecoration: none;
    fontWeight: 500;
    borderBottom: 2px solid transparent;
    color: black;
    marginLeft: 30px;
    marginTop: 25px;
    paddingBottom: 15px;
    margin-left: 50px;
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
                        <NavigationLink>
                            <StyledLink to={"/BuyStock"}> BuyStock </StyledLink>
                        </NavigationLink>
                    </Navigation>
                    <div>
                        <img style={image} alt="bank" src={bank} />
                    </div>

                </header >

            </div>
        );
    };
}
export default Navbar;