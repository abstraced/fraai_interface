import React, { useState, useEffect } from 'react';


// import './order-card.scss';


import {setSelectedOrder } from '../../../../actions/actions';



import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


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
      <Card style={{ width: '30rem',height:'30rem',marginTop:"10px",padding:"10px",textAlign: "center" }}> 
    <div className="order-card"  onClick={()=>{ props.changeView('selected');setSelectedOrder(props.order)}}>
   
     <Card.Header className="title"> Invoice number:{props.order[0].data_InvoiceNumber}  </Card.Header>
     <Card.Title>
    <div className="invoice_number">Customer #: {customer.ID} </div>
    
    <div className="name"><span className="title">Name:</span> {customer.first_name} {customer.last_name} </div>
    </Card.Title>
    <Card.Subtitle>
    <div className="address"><span className="title">Billing address: </span>{customer.street_number} {customer.zipcode} {customer.city} {customer.country} </div>
    <div className="amount"><span className="title">Amount: </span>{props.order[0].data_Amount} </div>
    </Card.Subtitle>
    
    <ListGroup> Furnitures:
     { props.order.map((order)=>{
    return   <ListGroup.Item variant="info" as="li">{order.data_TypeFurniture}</ListGroup.Item>

     })


     }
    </ListGroup>
    {/* list */}
    



    </div>
    </Card>
    )}
    else{
   
    return (
      <div> </div>
    )
  }
   

  
}



 
export default connect(mapStateToProps,{setSelectedOrder})(OrderCard);