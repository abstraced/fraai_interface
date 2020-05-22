import React from 'react';


import './order-card.scss';



export class OrderCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { order, onClick } = this.props;
    

  let  adresse= order.data_DueDateFinal;

    return (
    <div className="order-card" onClick={() => onClick(order)}>

    <div className="name"><span className="title">Name:</span> {order[0].data_FullName} </div>
    <div className="address"><span className="title">Address: </span>{order[0].data_InvoiceAddress} </div>
    <div className="amount"><span className="title">Amount: </span>{order[0].data_Amount} </div>
    <div className="invoice_number"><span className="title">Invoice number:</span> {order[0].data_InvoiceNumber} </div>
     <ul className="furnitures"><span className="title"> Furnitures:</span>
     { order.map((order)=>{
    return <li  >{order.data_TypeFurniture}</li>

     })


     }
     </ul>
    {/* list */}
    



    </div>
    );

  }
}