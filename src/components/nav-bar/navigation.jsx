import React from 'react';

import { GoogleLogout } from 'react-google-login';

import { connect } from 'react-redux';
import { setUserInfos } from '../../actions/actions';




import { NavLink } from 'react-router-dom';



//Bootstrap
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'






// import  {UpdateOrderView}  from './update-order-view/update-order-view';


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
    <Navbar.Brand href="/"><Image bg="light" background="white"  src='https://cdn.webshopapp.com/shops/215747/themes/141665/assets/logo.svg?20200327142814'  fluid />
    </Navbar.Brand>
    <Nav className="mr-auto">
    <Nav.Link  href="/orders/">Orders </Nav.Link>
    <Nav.Link  href="/customers">Customers </Nav.Link>
      
    </Nav>
    
<Button onClick={() => this.props.setUserInfos({ name: 'tobi'})}> Disconnect </Button>
    {/* <GoogleLogout
      clientId="703753342682-pofbuml594pvb54ajushgu4ln52i7l31.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={() => this.props.setUserInfos({ name: 'tobi'})}
    >
    </GoogleLogout> */}
    
  </Navbar>
{/* 
  <Navbar expand="lg" variant="light" bg="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
  </Navbar>

   
     <Nav justify  defaultActiveKey="/">
  <Nav.Item style={{padding: '5px'}}>
    <NavLink to="/"> <Image style={{padding: '5px'}} src='https://cdn.webshopapp.com/shops/215747/themes/141665/assets/logo.svg?20200327142814'  fluid />
    
   </NavLink>
  </Nav.Item>
  <Nav.Item>
  <NavLink  to="/orders">Orders </NavLink>
</Nav.Item>
<Nav.Item>
  <NavLink  to="/customers">Customers </NavLink>
</Nav.Item>
<Nav.Item>
<Button onClick={() => this.props.setUserInfos({ name: 'tobi'})}> Disconnect </Button>
</Nav.Item>
<Nav.Item>
<GoogleLogout
      clientId="703753342682-pofbuml594pvb54ajushgu4ln52i7l31.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={() => this.props.setUserInfos({ name: 'tobi'})}
    >
    </GoogleLogout>
</Nav.Item>

</Nav> */}
    
    
    </div>
  )


    }   
    
}




export default connect(null,{setUserInfos})(Navigation);