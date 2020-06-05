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
    
    data_TypeFurniture: ['Type furniture: ','card-text '],
    data_ItemId: ['Item Id: ','card-title h5'],
    data_OrderDescription: ['Description:    ','card-text '],
    data_OrderSize: ['Size:   ','card-text '],
    data_SpecialCode: [' Special code: ','card-text '],
    data_OrderColor: ['Order color: ','card-text '],
    data_OrderSize:[ 'Order size : ','card-text '],
    data_Amount: ['Price','card-text '],
    data_NoteLaura: [' Note Laura:  ','card-text ']



  };

  function turnIntoComponent  (keyName)  {
    
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
      <button>  Delete Article</button>

    </Card>
    
  )


}