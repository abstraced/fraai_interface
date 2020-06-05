import React, { useState, useEffect } from 'react';
var _ = require('lodash');






import {OrderList} from './orders-list/orders-list';
import {OrderCreate} from './order-create/order-create';


import OrderSingle from './order-single/order-single';





import {connect } from 'react-redux';
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
    articles: state.articles,
    template: state.templates.Template_order
         
   };
};





 function OrderView (props) {


  const [view, setView] = useState('list');
  const [isStandalone, setIsStandalone] = useState(false);
  const [preventRerendering, setIspreventRerendering] = useState(false);
  const [nextID, setNextID] = useState();
  

  


  useEffect(() => {


    ///Get the LAST item ID
    var arrayOfId = [];
    Object.keys(props.orders).map(x => {for (var item in props.orders[x]){  
    if (parseInt(props.orders[x][item].data_ItemId )) { arrayOfId.push(parseInt(props.orders[x][item].data_ItemId));}
    }});
    var theHighest = Math.max(...arrayOfId); 
    setNextID(theHighest+1);




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
    
   },[props.order]);
  
  
  
function changeView(display ) {
  setView(display);

}
 
function getItemID () {

setNextID(nextID+1);

  return (nextID)
}

function createNewOrder () {
  var createdOrder = _.mapValues(props.template, () => '');
  createdOrder.data_ItemId= getItemID();
  
 let arrayOfOrder= [];

  arrayOfOrder.push(createdOrder);
  props.setSelectedOrder(arrayOfOrder);

  console.log(createdOrder)



}




  if (view === 'list') {
    return  (
   <div>
     <Row >
     <Col> </Col>
     <Col xs={8} style={{textAlign: "center", fontSize:"30px"}}>Orders List</Col>
     <Col> <Button variant="secondary"onClick={()=> {changeView('create'),createNewOrder()}}> Create an order</Button></Col>
     </Row>
     <OrderList isStandalone={props.isStandalone} changeView={changeView} orders={props.orders}/>
      </div>  )
     ;
   }


 else if (view === 'create') {
  



    return (
      <OrderSingle
      
      getId={getItemID}
      changeView={changeView}
      template={props.articles[0]}
      user={props.user}
      create={true}  
      
      />  
 

      );
  }
 

 else if (view ==='selected')
  if (props.selectedOrder) {
    // var customerActive= props.customers.find( x=> x.ID===props.order[0].data_CustomerNumber);
    // props.setSelectedCustomer(customerActive);


    return (
   <OrderSingle
  
   getId={getItemID}
   changeView={changeView}
   template={props.articles[0]}
   user={props.user}  
   
   />
   );
  }
    
   
}



 
export default connect(mapStateToProps,{setSelectedOrder,setSelectedCustomer})(OrderView);


