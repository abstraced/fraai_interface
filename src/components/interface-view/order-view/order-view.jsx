import React, { useState, useEffect } from 'react';





import { connect } from 'react-redux';


import {OrderList} from './orders-list/orders-list';
import {OrderCreate} from './order-create/order-create';


import OrderSingle from './order-single/order-single';


import {setSelectedOrder } from '../../../actions/actions';
import {setSelectedCustomer } from '../../../actions/actions';






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
    if (props.order && !preventRerendering) {
     props.setSelectedOrder(props.order);
     if (customerActive){
      var customerActive= props.customers.find( x=> x.ID===props.order[0].data_CustomerNumber);
    
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
  // props.setSelectedOrder(order);
  // var customerActive= props.customers.find( x=> x.ID===order[0].data_CustomerNumber);

  // props.setSelectedCustomer(customerActive);
  
  


}
 





  if (view === 'list') {
    return  (
   <div>  
     <h2>Orders List</h2>  
     <button onClick={()=> changeView('create')}> Create an order</button>
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
    return (<div> Order selected 
   <OrderSingle
  
   changeView={changeView}
   template={props.articles[0]}
   user={props.user}  
   
   />
    </div>);
  }
    
//   else{
 

//       return (


// <div>   Loading the USEERRRRRRRRR</div>

//       )

//     }
   
}



 
export default connect(mapStateToProps,{setSelectedOrder,setSelectedCustomer})(OrderView);


