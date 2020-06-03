import React, { useState, useEffect } from 'react';






import {OrderList} from './orders-list/orders-list';
import {OrderCreate} from './order-create/order-create';


import OrderSingle from './order-single/order-single';





import { connect } from 'react-redux';
import {setSelectedOrder } from '../../../actions/actions';
import {setSelectedCustomer } from '../../../actions/actions';



import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';






const mapStateToProps = state => {

  return {
    customers: state.customers,
    user: state.userInfos,
    selectedCustomer: state.selectedCustomer,
    selectedOrder: state.selectedOrder,
    orders: state.orders,
    articles: state.articles
         
   };
};





 function OrderView (props) {


  const [view, setView] = useState('list');
  const [isStandalone, setIsStandalone] = useState(false);
  const [preventRerendering, setIspreventRerendering] = useState(false);
  

  


  useEffect(() => {
    if (props.view ) {
      setView (props.view);

    }
    if (props.order ) {
      var customerActive= props.customers.find( x=> x.ID===props.order[0].data_CustomerNumber);
     props.setSelectedOrder(props.order);
     if (customerActive){
     
    
      props.setSelectedCustomer(customerActive);
    }
    else
      setIspreventRerendering(true);
   
  
  
    };
    

    // if (props.isStandalone ) {
    //   setIsStandalone(props.isStandalone )
   
    //  };  
   },[props]);
  
  




  
function changeView(display ) {
  setView(display);
  
  
  


}
 





  if (view === 'list') {
    return  (
   <div>
     <Row >
     <Col> </Col>
     <Col xs={8} style={{textAlign: "center", fontSize:"30px"}}>Orders List</Col>
     <Col> <Button variant="secondary"onClick={()=> changeView('create')}> Create an order</Button></Col>
     </Row>
     <OrderList isStandalone={props.isStandalone} changeView={changeView} orders={props.orders}/>
      </div>  )
     ;
   }


 else if (view === 'create') {
    return (<div><OrderCreate />
      <OrderSingle
      
      changeView={changeView}
      template={props.articles[0]}
      user={props.user}
      create={true}  
      
      />  

</div>
      );
  }
 

 else if (view ==='selected')
  if (props.selectedOrder) {
    // var customerActive= props.customers.find( x=> x.ID===props.order[0].data_CustomerNumber);
    // props.setSelectedCustomer(customerActive);


    return (
   <OrderSingle
  
   changeView={changeView}
   template={props.articles[0]}
   user={props.user}  
   
   />
   );
  }
    
//   else{
 

//       return (


// <div>   Loading the USEERRRRRRRRR</div>

//       )

//     }
   
}



 
export default connect(mapStateToProps,{setSelectedOrder,setSelectedCustomer})(OrderView);


