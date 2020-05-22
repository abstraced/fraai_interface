import React, { useState, useEffect } from 'react';



var _ = require('lodash');



import  {OrderArticle}  from './order-article/order-article';



export function OrderArticles (props) {

    
      








 if(props.order) {
     return (

    <div className="articles"> Articles

{ props.order ?   props.order.map((item)=> <OrderArticle article={item}/>)
: <div> loading </div>




}  
        
        
        
   </div>)}

    else {return (
        <div> not so Good    </div>)}




}