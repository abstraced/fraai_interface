import React, { useState, useEffect } from 'react';



import OrderCard from '../order-card/order-card';


import { NavLink } from 'react-router-dom';



  




export function OrderList (props) {


   
const [searchInput, setSearchInput] = useState('');



    

  return (

     
      <div>  List
           <input value={searchInput}  placeholder='Type the family name you are looking for'
   onChange={e => setSearchInput(e.target.value)} /> 
           
      {/* {Object.keys(props.orders)
 .filter((keyName) => 
 props.customers[keyName][0]
 .data_FullName.toLowerCase()
 .includes(searchInput))
 .map((keyName, item) => (


<div> sexy </div> 

))  } */}
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
                    <NavLink to={`/order/${props.orders[keyName][0].data_InvoiceNumber}`} > 
                     <OrderCard changeView={props.changeView} order={props.orders[keyName]}/>
                    </NavLink>
                
                
                    )}
                   else{return (
                    <OrderCard changeView={props.changeView} order={props.orders[keyName]}/>
                
                
                
                   )}})}


      </div> 
  )



 }

 