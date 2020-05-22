import React, { useState, useEffect } from 'react';






import { connect } from 'react-redux';




import {setSelectedOrder } from '../../../../../../../actions/actions';




const mapStateToProps = state => {

    return {
     
      selectedOrder: state.selectedOrder,
     
           
     };
  };






function UpdateOrderArticle  (props) {



    
    const [updatedArticle, setUpdatedArticle] = useState(false);





    
    useEffect(() => {
        if (props.article) {
            setUpdatedArticle(props.article)


        }
    }, [props]);




    var filter= {
    // data_ItemId: 'Item Id: ',
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

    <div className="general-infos-update"  >

    <h2 className="id-card">Article infos update </h2>
    
    <form >      
          
  {Object.keys(updatedArticle).filter(function(item) {
  for (var key in filter) {
    if (item === key )
     return true;
  }
  return false;
}).map((keyName, item) => (

                    <label> {filter[keyName]}:
            <input className={keyName}
                defaultValue={updatedArticle[keyName]}
                onChange={e => {
                    const val = e.target.value;
                    let updatedOrder = props.selectedOrder.find(x => x.data_ItemId === updatedArticle.data_ItemId);
                   updatedOrder[keyName]=val;

                    let update= props.selectedOrder.map(obj =>{ if( obj.data_ItemId=== updatedArticle.data_ItemId)  {
                    return updatedOrder;
                    } else {
                    return obj

                    }
                });
                    
                  
                 
                  

                                   
                    props.setSelectedOrder(update);
                }} />
         </label>
     
        ))
            }







       

    </form>



   
  
</div>


)

}



 
export default connect(mapStateToProps,{setSelectedOrder})(UpdateOrderArticle);



