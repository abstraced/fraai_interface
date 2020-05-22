import React, { useState, useEffect } from 'react';


// import './order-card.scss';


import {setSelectedOrder } from '../../../../actions/actions';





import { connect } from 'react-redux';

const mapStateToProps = state => {

  return {
    
    customers: state.customers
         
   };
};


function  OrderCard (props) {
  




  const [customer, setCustomer] = useState({});

  useEffect(() => {
    var customerActive= props.customers.find( x=> x.ID===props.order[0].data_CustomerNumber);
    setCustomer(customerActive);
  }, [props]);



 
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
   
   
   if( customer){
    return (
    <div className="order-card"  onClick={()=>{ props.changeView('selected');setSelectedOrder(props.order)}}>
   
    <div className="id"><span className="title">Id:</span> {customer.ID} </div>
    
    <div className="name"><span className="title">Name:</span> {customer.first_name} {customer.last_name} </div>
    <div className="address"><span className="title">Billing address: </span>{customer.street_number} {customer.zipcode} {customer.city} {customer.country} </div>
    <div className="amount"><span className="title">Amount: </span>{props.order[0].data_Amount} </div>
    <div className="invoice_number"><span className="title">Invoice number:</span> {props.order[0].data_InvoiceNumber} </div>
     <ul className="furnitures"><span className="title"> Furnitures:</span>
     { props.order.map((order)=>{
    return <li  >{order.data_TypeFurniture}</li>

     })


     }
     </ul>
    {/* list */}
    



    </div>
    )}
    else{
   
    return (
      <div> </div>
    )
  }
   

  
}



 
export default connect(mapStateToProps,{setSelectedOrder})(OrderCard);