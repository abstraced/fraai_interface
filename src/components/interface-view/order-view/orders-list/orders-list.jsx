import React, { useState, useEffect } from 'react';



import OrderCard from '../order-card/order-card';

import CardDeck from 'react-bootstrap/CardDeck';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


import { NavLink } from 'react-router-dom';





  




export function OrderList (props) {


   
const [searchInput, setSearchInput] = useState('');



    

  return (

     
      <div>  
        <InputGroup className="mb-3">
  <InputGroup.Prepend>
    <InputGroup.Text>First or last name</InputGroup.Text>
  </InputGroup.Prepend>
  <FormControl value={searchInput}  placeholder='Type the family name you are looking for'
   onChange={e => setSearchInput(e.target.value)} />
  {/* <FormControl /> */}
</InputGroup>
  
     <CardDeck style={{ margin:"auto", justifyContent:"center" }}> 
    {Object
                   .keys(props.orders)
                   .filter((keyName) => {
                    if (props.orders[keyName][0].data_FullName && searchInput !='' ){
                   return (props.orders[keyName][0].data_FullName.toLowerCase().includes(searchInput))}
                   else {
                    return ( props.orders)
 
                    }
                  // return  props.orders[keyName]
                   }
                   

)
                  //  .filter((keyName) => 
                  //  props.orders[keyName][0]
                  //  .data_FullName.toLowerCase()
                  //  .includes(searchInput))
                   .map((keyName, item) => {
                     
                    
                    if (props.isStandalone=== true) {
                      return (
                    <NavLink style={{textDecoration: 'none', color:'black'}} to={`/order/${props.orders[keyName][0].data_InvoiceNumber}`} > 
                     <OrderCard changeView={props.changeView} order={props.orders[keyName]}/>
                    </NavLink>
                
                
                    )}
                   else{return (
                    <OrderCard changeView={props.changeView} order={props.orders[keyName]}/>
                
                
                
                   )}})}
      </CardDeck>     


      </div> 
  )



 }

 