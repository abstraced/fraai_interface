import React, { useState, useEffect } from 'react';






// import './order-single.scss';

// import  CustomerUpdate  from '../customer-update/customer-update';



import axios from 'axios';
var _ = require('lodash');



import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';




import CustomerView from '../../customer-view/customer-view';
import { OrderGeneralInfos } from './order-general-infos/order-general-infos';

import { LoadingView } from '../../../loading-view/loading-view';
import { OrderArticles } from './order-articles/order-articles';


import { setOrders } from '../../../../actions/actions';
import { setSelectedOrder } from '../../../../actions/actions';




const mapStateToProps = state => {

  return {
    customers: state.customers,
    orders: state.orders,
    selectedCustomer: state.selectedCustomer,
    selectedOrder: state.selectedOrder,
    template: state.templates.Template_order

  };
};






function OrderSingle(props) {





  const [updateOrder, setUpdateOrder] = useState(false);
  
  const [itemID, setItemID] = useState(0);


  useEffect(() => {


  // GET THE LAST ID  
  var arrayOfId = [];
  
  Object.keys(props.orders).map(x => {for (var item in props.orders[x]){  
  if (parseInt(props.orders[x][item].data_ItemId )) { arrayOfId.push(parseInt(props.orders[x][item].data_ItemId));}
  }});
  
  var theHighest = Math.max(...arrayOfId); 

  setItemID(theHighest+1);

  }, []);




  


/// SAVE TO GOOGLE AND UPDATE THE STATE TO INCLUDE IT


  const saveupdatedOrder = () => {

    // LIST OF THE PARAMETER THAT ARE UPDATED
    var filter = {
      data_ItemId: 'Item Id: ',
      data_TypeFurniture: ' Type of furniture: ',
      data_OrderDescription: 'Description:    ',
      data_OrderSize: 'Size:   ',
      data_SpecialCode: ' Special code: ',
      data_OrderColor: 'Order color: ',
      data_OrderSize: 'Order size : ',
      data_Amount: 'Price',
      data_NoteLaura: ' Note Laura',


    data_DeliveryAddress:'Delivery address:  '   ,
    data_InvoiceAddress: ' Invoice address:    ',
    data_OrderDate:'Order date:  ',
    data_CustomerNumber: 'Customer number:',        
    data_DueDateFinal: 'Due date final:    ',
    data_InvoiceNumber : 'Invoice number:   ', 
    data_PaymentMethod : 'Payment method: ', 
    data_PlatFormExtraInfos: ' platform extra infos :       ',
    data_Platform : 'Platform:    ', 
    data_VAT : 'MWst:    ',
    data_Datum100: ' Full payement on the  : ',    
    data_Amount50: ' Half payment of : ' ,
    data_Datum50: ' Half payment done on the:   '

    };


    var rows = [];
    var values = [];


    for (var i = 0; i < props.selectedOrder.length; i++) {
      var row = parseInt(props.selectedOrder[i].data_ItemId) - 1128;
      rows.push(row);



  /// TAKE EVERY LINE AND TURN THEM INTO AN ARRAY
      Object.keys(props.selectedOrder[i])
        .filter(function (item) {
          for (var key in filter) {
            if (item === key)
              return true;
          }
          return false;
        })
        .map(function (key) {
          if (key === 'data_CustomerNumber') {
            var data = {
              range: `API_DATA!${props.template[key]}${row}`,
              values: [[props.selectedCustomer.ID]]



            }
          }
          else {

            var data = {
              range: `API_DATA!${props.template[key]}${row}`,
              values: [[props.selectedOrder[i][key]]]


            }
          }

          values.push(data);


        });
    };


    var url = 'https://sheets.googleapis.com/v4/spreadsheets/1YaUmRgz_NZeFsNBD5oxd1r8Z-x1J86IqJB7l-lRJVaQ/values:batchUpdate';
    var resource = {

      valueInputOption: 'RAW',
      data: values
    };

  //FETCH THE DATA TO GOOGLE SHEET

    axios.post(url, resource, {
      headers: {
        Authorization: 'Bearer ' + props.user.accessToken
      }
    })
      .then(function (response) {
        console.log(values);
      })
      .then(() => {
        var newArray = props.orders;
        newArray[props.selectedOrder[0].data_InvoiceNumber] = props.selectedOrder;

        props.setOrders(newArray);
        localStorage.setItem("Orders", JSON.stringify(newArray));


      })

      .catch(function (error) {
        console.log(error);
      });
  }


/// ADD AN EMPTY ARTICLE AND UPDATE THE SELECTED ORDER STATE

  const addArticle = (e) => {
    e.preventDefault();
    setItemID(itemID+1);
    

     var createdArticle = _.mapValues(props.template, () => '');
    // createdArticle.ID= newId;


    var assignGeneralInfos= ['data_DeliveryAddress',
    'data_CustomerNumber',
     'data_OrderDate',        
     'data_DueDateFinal',
     'data_InvoiceNumber', 
     'data_PaymentMethod' , 
     'data_Platform' , 
     'data_VAT'];

     for (var item in assignGeneralInfos) {
     createdArticle[assignGeneralInfos[item]] = props.selectedOrder[0][assignGeneralInfos[item]];
     console.log(item);
     };

     createdArticle.data_ItemId=itemID;
    
    //  createdArticle.data_ItemId = nouvelle valeurs
   
    // createdArticle.data_PaymentMethod = props.selectedOrder[0].data_PaymentMethod;     
    

    props.setSelectedOrder([...props.selectedOrder,createdArticle]);

    


  }


  // var customerActive= props.customers.find( x=> x.ID===props.selectedOrder[0].data_CustomerNumber);



// WAIT FOR THE LOADING OF THE PROPS
  if (props.selectedOrder.length > 0) {



    return (
     <div>
       <Row>
         <Col></Col>
         <Col>
        <NavLink to={`/orders`} > <Button >   Back to list </Button></NavLink>
        <Button variant="danger" onClick={saveupdatedOrder}> Save changes</Button>
        <Button onClick={addArticle} > Add an article</Button>
        </Col>
        </Row>
        <Row >
        <Col>
        { props.create ?   <CustomerView className="customer_view" view="create" />:
        <CustomerView className="customer_view" view="selected"  />
        }
         </Col>
        <Col>
       
        <OrderGeneralInfos className="general_view" generalInfos={props.selectedOrder[0]} />         
        </Col>
        </Row>
        
        <OrderArticles className="articles_view" template={props.template} order={props.selectedOrder} />
        </div>
    )
  }

  
  else {
    return (

      <LoadingView />
    )

  }





}



export default connect(mapStateToProps, { setOrders, setSelectedOrder })(OrderSingle);