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

<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  <br />
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>

   
     {/* <Nav justify variant="tabs" defaultActiveKey="/">
  <Nav.Item>
    <NavLink to="/"> <img 
    src='https://cdn.webshopapp.com/shops/215747/themes/141665/assets/logo.svg?20200327142814' 
   /></NavLink>
  </Nav.Item>
  <Nav.Item>
  <NavLink  to="/orders">Orders </NavLink>
</Nav.Item>
<Nav.Item>
  <NavLink  to="/customers">Customers </NavLink>
</Nav.Item>

</Nav>
    <button onClick={() => this.props.setUserInfos({ name: 'tobi'})}> Disconnect </button>
    <GoogleLogout
      clientId="703753342682-pofbuml594pvb54ajushgu4ln52i7l31.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={() => this.props.setUserInfos({ name: 'tobi'})}
    >
    </GoogleLogout> */}
    </div>
  )


    }   
    
}




export default connect(null,{setUserInfos})(Navigation);