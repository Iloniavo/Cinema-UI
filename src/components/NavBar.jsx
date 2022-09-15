import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavBarElements';
  
const Navbar = () => {
  return (
    <div style={{
        position: 'fixed',
        margin: '0', 
        padding: '0',
        width: '100%',
        opacity: '0.7'  
    }} >
      <Nav>
        <Bars 
          /> 
        <NavMenu>
        <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/movies' activeStyle>
            Movies
          </NavLink>
          <NavLink to='/broadcasts' activeStyle>
            Broadcastings
          </NavLink>
          <NavLink to='/rooms' activeStyle>
            Rooms
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};
  
export default Navbar;