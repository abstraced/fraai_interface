import React, { useState } from 'react';





import CustomerUpdate from '../customer-update/customer-update';
import OrderView from '../../order-view/order-view';
import { Link } from "react-router-dom";





export function CustomerSingle(props) {






  const [updateUser, setUpdateUser] = useState(false);


  const backToList = () => {

    props.changeView('list');




  }



  function toggleUpdate() {
    setUpdateUser(!updateUser);

  }



  return (
    <div className="customer-card"  >
      {updateUser == true ?
        <CustomerUpdate
          template={props.template}
          user={props.user}
          customer={props.customer}
          togglepUdate={toggleUpdate}

        /> :
        <div>
          <h2 className="id-card">ID: {props.customer.ID} </h2>
          <div className="name-customer-card">Name: {props.customer.first_name}  {props.customer.last_name}</div>
          <div className="address-customer-card">Address: {props.customer.street_number},{props.customer.zipcode} {props.customer.city}, {props.customer.country}</div>
          
          
          
          {props.isStandalone === true ?
            <Link to={`/customers`}>
              <button onClick={backToList}> Go back to list</button>
            </Link>
            :
            <button onClick={backToList}> Change customer</button>
            
            
            }
          <button onClick={toggleUpdate}> Update customer</button>
        </div>



      }


    </div>

  )





}


