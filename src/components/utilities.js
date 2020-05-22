

//// Fetch utility



const turn_rows_in_object = (rows) => {
 
  
  var header =rows [0];
  var myObjects= [];
  
  for ( var i=1;i<rows.length; i++) {
    
    var r= {};
    var values = rows[i];
    
   
       for ( var j=0; j<header.length; j++) {
        if ( header[j] !="") {
        r[header[j]] = values[j];        
        }
       }
       myObjects.push(r); 
  
}

return myObjects;
}


exports.turn_rows_in_object = turn_rows_in_object;
