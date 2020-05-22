import React, { useState, useEffect } from 'react';



import  CustomerCard  from './customer-card/customer-card';
import  {CustomerSingle}  from './customer-single/customer-single';
import  CustomerCreate  from './customer-create/customer-create';




import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';




import {setSelectedCustomer } from '../../../actions/actions';

// import './customer-view.scss';




const mapStateToProps = state => {

  return {
    customers: state.customers,
    user: state.userInfos,
    selectedCustomer: state.selectedCustomer,
    template: state.templates.Template_customer
         
   };
};





 function CustomerView (props) {
    

      


const [view, setView] = useState('list');
const [searchInput, setSearchInput] = useState('');
const [isStandalone, setIsStandalone] = useState(false);



useEffect(() => {
  if (props.view ) {
       
    setView(props.view);

     

  };
  if (props.customer ) {
   props.setSelectedCustomer(props.customer )

  };
  if (props.isStandalone ) {
    setIsStandalone(props.isStandalone )
 
   };  
 },[props]);



function changeView(display,customer  ) {
    setView(display);
    // props.setSelectedCustomer(customer);
    


  }
   


  if (view === 'list') {
   return  (
   <div className="list"> 
    <button onClick={()=> changeView('create',null)}>Add a customer</button>
   <input value={searchInput} 
   onChange={e => setSearchInput(e.target.value)} /> 
   
   <div className='customers-list'>
         
         {Object
         .keys(props.customers)
 .filter((keyName) => 
 props.customers[keyName]
 .last_name.toLowerCase()
 .includes(searchInput))
 .map((keyName, item) => { 
   if (isStandalone=== true) {
      return (
    <NavLink to={`/customer/${props.customers[keyName].ID}`} > 
    <CustomerCard 
    key={item} 
    changeView={changeView}
    customer={props.customers[keyName]} 
    onClick={e => {props.setSelectedCustomer(props.customers[keyName]);
    setView(selected)}} /> 
    </NavLink>


    )}
   else{return (
    <CustomerCard 
    key={item} 
    changeView={changeView}
    customer={props.customers[keyName]} 
    onClick={e => {props.setSelectedCustomer(props.customers[keyName]);
    setView(selected)}} /> 



   )}



})  }
   </div>   
  </div>   )
    ;
  }

  if (view=== 'selected') 
   if (props.selectedCustomer){
    return (<CustomerSingle 
      isStandalone={isStandalone}
      template={props.template} 
      user={props.user} 
      customer={props.selectedCustomer} 
      changeView={changeView} 
      /> 
);
  } else { return (<div>  Loading</div>)}

  if (view === 'create') {
    return <CustomerCreate  template={props.template} changeView={changeView} />;
  }


   
}



 
export default connect(mapStateToProps,{setSelectedCustomer})(CustomerView);


// return (
//   <div className="general-info"> Customer's info   
   
//   <button onClick={()=> {setCreateCustomer(true);setCustomerSelected(null);}}> Add Customer </button>

//   {createCustomer == true ?
// <CustomerCreate  template={props.customers[0]} /> :
// <div>  false </div>







//   }
//    {/* INITIAL Check for loading  */}
//   {props.customers ?
// //  TextDecoderStream
      
//       props.selectedCustomer != null ?
//       
//       :(
   
   

// ): <div>  Loading</div>


//   }

  
//    </div>

//     )    