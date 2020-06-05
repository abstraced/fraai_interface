import React, { useState } from 'react';



import Card from 'react-bootstrap/Card';



import UpdateGeneralInfos from './update-general-infos/update-general-infos';
import { Link } from "react-router-dom";




export function OrderGeneralInfos (props) {

    


  const [updateGeneralInfos, setUpdateGeneralInfos] = useState(false);



  var filter= {
    data_DeliveryAddress:'Delivery address:  '   ,
    data_InvoiceAddress: ' Invoice address:    ',
    data_OrderDate:'Order date:  ',
    // data_CustomerNumber: 'Customer number:',        
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




return (


<Card className="general_infos">


<Card.Title> General informations </Card.Title>

{updateGeneralInfos == true ?
<UpdateGeneralInfos generalInfos={props.generalInfos} />
:
<div className="general-infos"> 
    {Object.keys (props.generalInfos)
    .filter(function(item) {
        for (var key in filter) {
          if (item === key )
           return true;
        }
        return false;
      })
      .map((keyName)=>(
      <div>{filter[keyName]} {props.generalInfos[keyName]}






      </div>))




    }



</div>
}

{(updateGeneralInfos) ? 
    <button onClick={()=>setUpdateGeneralInfos(false) }> Validate general informations   </button>    : 
    <button onClick={()=>setUpdateGeneralInfos(true) }> Update general informations   </button> 
} 
</Card>

)



}