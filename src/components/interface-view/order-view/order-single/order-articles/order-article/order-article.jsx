import React, { useState } from 'react';



import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'

import UpdateOrderArticle from './update-order-article/update-order-article';


export function OrderArticle(props) {




  const [updateArticle, setUpdateArticle] = useState(false);



  function toggleUpdate() {
    setUpdateArticle(!updateArticle);

  }




  var filter = {
    
    data_TypeFurniture: ['Item Id: ','card-text '],
    data_ItemId: ['Item Id: ','card-title h5'],
    data_OrderDescription: 'Description:    ',
    data_OrderSize: 'Size:   ',
    data_SpecialCode: ' Special code: ',
    data_OrderColor: 'Order color: ',
    data_OrderSize: 'Order size : ',
    data_Amount: 'Price',
    data_NoteLaura: ' Note Laura'



  };

  function turnIntoComponent  (keyName)  {
    console.log(keyName);
    console.log(filter[keyName]);
    
    var TagName = filter[keyName][1];
    return (


      <div className={TagName || 'yo'}>{filter[keyName][0]} {props.article[keyName]}  
     
      
      </div>
      
    
    );



  };





  return (
   
    <Card style={{  
      minWidth: '25%',
      textAlign: "center" }} > 

      {updateArticle === true ?
        <UpdateOrderArticle article={props.article} />

     
        : 
        
    Object.keys(props.article)
            .filter(function (item) {
              for (var key in filter) {
                if (item === key)
                  return true;
              }
              return false;
            })
            .map((keyName) => ( turnIntoComponent(keyName))
            





            )




          
          




}
      {(updateArticle) ?
        <button onClick={() => setUpdateArticle(false)}> Validate update   </button> :
        <button onClick={() => setUpdateArticle(true)}> Update article   </button>
      }

    </Card>
    
  )


}