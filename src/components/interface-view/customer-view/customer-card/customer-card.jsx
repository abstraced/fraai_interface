import React, { useState, useEffect } from 'react';




import { connect } from 'react-redux';


import {setSelectedCustomer } from '../../../../actions/actions';




function CustomerCard (props) {



  const updateCustomer =() => {
    props.changeView('selected',props.customer);
    
    props.setSelectedCustomer(props.customer)




  }
   
       
    return (
        <div className="customer-card"  onClick={updateCustomer} >  
        <h2 className="id-card">ID: {props.customer.ID} </h2> 
        <div className="name-customer-card">Name: {props.customer.first_name}  {props.customer.last_name}</div>   
        <div className="address-customer-card">Address: {props.customer.street_number},{props.customer.zipcode} {props.customer.city}, {props.customer.country}</div>   
         
        </div>
      
          )
    




}


export default connect(null,{setSelectedCustomer})(CustomerCard);


