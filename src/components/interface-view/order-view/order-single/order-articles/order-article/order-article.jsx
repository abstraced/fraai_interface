import React, { useState } from 'react';





import UpdateOrderArticle from './update-order-article/update-order-article';


export function OrderArticle(props) {




  const [updateArticle, setUpdateArticle] = useState(false);



  function toggleUpdate() {
    setUpdateArticle(!updateArticle);

  }




  var filter = {
    data_ItemId: 'Item Id: ',
    data_TypeFurniture: ' Type of furniture: ',
    data_OrderDescription: 'Description:    ',
    data_OrderSize: 'Size:   ',
    data_SpecialCode: ' Special code: ',
    data_OrderColor: 'Order color: ',
    data_OrderSize: 'Order size : ',
    data_Amount: 'Price',
    data_NoteLaura: ' Note Laura'



  };





  return (
    <div className="article"> 

      {updateArticle == true ? <div> Article update view
        <UpdateOrderArticle article={props.article} />

      </div>
        :
        <div className="article"> Article
    {Object.keys(props.article)
            .filter(function (item) {
              for (var key in filter) {
                if (item === key)
                  return true;
              }
              return false;
            })
            .map((keyName) => (
              <div>{filter[keyName]} {props.article[keyName]}






              </div>))




          }




        </div>}
      {(updateArticle) ?
        <button onClick={() => setUpdateArticle(false)}> Validate update   </button> :
        <button onClick={() => setUpdateArticle(true)}> Update article   </button>
      }

    </div>
  )


}