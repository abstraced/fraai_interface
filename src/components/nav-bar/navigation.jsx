import React from 'react';


import { GoogleLogout } from 'react-google-login';




import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { NavLink } from 'react-router-dom';



import { connect } from 'react-redux';
import { setUserInfos } from '../../actions/actions';


//Bootstrap
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'





 class Navigation extends React.Component {

    constructor() {
        super();
        
    
        this.state = {
          
        };
      }





    render () {
       
      



  return (

    <div className='navigation'>


<Navbar >
   <NavLink to="/"> <Navbar.Brand><Image bg="light" background="white"  src='https://cdn.webshopapp.com/shops/215747/themes/141665/assets/logo.svg?20200327142814'  fluid />
    </Navbar.Brand></NavLink>
   
    { this.props.isConnected?
     <Nav className="mr-auto">
    <NavLink to="/orders/">Orders </NavLink>
    <NavLink to="/customers">Customers </NavLink>   
    </Nav>
    :<div> Connectez vous</div>}

    { this.props.isConnected? 
    <div>
      <NavLink to="/">
     <Button
      onClick={() => {
      localStorage.clear();
      this.props.onLogOut(false);
      console.log('test')}}> Disconnect </Button></NavLink>: <div> </div>
    <GoogleLogout
      clientId="703753342682-pofbuml594pvb54ajushgu4ln52i7l31.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={() => this.props.setUser(null)}
    >
    </GoogleLogout>
    </div>: <div></div>}
    
      
    
    

    
    
  </Navbar>

    
    
    </div>
  )


    }   
    
}




export default connect(null,{setUserInfos})(Navigation);

Navigation.propTypes  = {
  isConnected: propTypes.bool

}
