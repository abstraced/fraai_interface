import React, { useState, useEffect } from 'react';








import { connect } from 'react-redux';








import {setSelectedOrder } from '../../../../../../actions/actions';



const mapStateToProps = state => {

    return {
     
      selectedOrder: state.selectedOrder,
     
           
     };
  };





 function UpdateGeneralInfos(props) {

    const [updatedGeneralInfos, setUpdatedGeneralInfos] = useState(false);



    useEffect(() => {
        if (props.generalInfos) {
            setUpdatedGeneralInfos(props.generalInfos)


        }
    }, [props]);


var filter= {
    data_DeliveryAddress:'Delivery address:  '   ,
    data_OrderDate:'Order date:  ',        
    data_DueDateFinal: 'Due date final::    ',
    data_InvoiceNumber : 'Invoice number:   ', 
    data_PaymentMethod : 'Payment method: ', 
    data_Platform : 'Platform:    ', 
    data_VAT : 'MWst:    ',     
  };








return (


    <div className="general-infos-update"  >

    <h2 className="id-card">General infos </h2>
    <h3 className="id-card">Invoice  </h3> 

    <form >      
          
  {Object.keys(props.selectedOrder[0]).filter(function(item) {
  for (var key in filter) {
    if (item === key )
     return true;
  }
  return false;
}).map((keyName, item) => (

                    <label> {filter[keyName]}:
            <input className={keyName}
                defaultValue={props.selectedOrder[0][keyName]}
                onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value;

                    let updatedOrder = props.selectedOrder.map(item=>
                        {
                            let customer = Object.assign({}, item);
                            customer[keyName] = val;
                            return { ...customer }
                        });
                 
                  

                                   
                    props.setSelectedOrder(updatedOrder);
                    console.log('test');
                }} />
         </label>
     
        ))
            }







       

    </form>



    {/* <button onClick={() => props.togglepUdate()}> Go back to user</button>
    <button onClick={updateCustomer}> Save changes</button> */}
</div>
)




}



 
export default connect(mapStateToProps,{setSelectedOrder})(UpdateGeneralInfos);



