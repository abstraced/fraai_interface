import React, { useState, useEffect } from 'react';



var _ = require('lodash');
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';



import  {OrderArticle}  from './order-article/order-article';



export function OrderArticles (props) {

    
      








 if(props.order) {
     return (

    <CardDeck style={{ 
       
        justifyContent:"center", 
        
       }}>
{/* <div> */}
{ props.order ?   props.order.map((item)=>{ 
    return (
    
    <OrderArticle article={item}/>
    
    )})
: <div> loading </div>




}  
        
{/* </div>      */}
        
// </CardDeck>
)}

    else {return (
        <div>  Props order missing  </div>)}




}