import React, { useState, useEffect } from 'react';


import axios from 'axios';






import { connect } from 'react-redux';


import { setCustomers, setSelectedCustomer } from '../../../../actions/actions';


const mapStateToProps = state => {

    return { customers: state.customers,
           
     };
  };



 function CustomerUpdate(props) {



    const [updatedUser, setUpdatedUser] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
   
  

    useEffect(() => {
        if (props.customer) {
            setUpdatedUser(props.customer)


        }
    }, [props]);




 
    

    const updateCustomer =() => {

        var row = parseInt(props.customer.ID) +3;
        var values =[];

        Object.keys(updatedUser).map(function(key, index) {
            


            if (key === 'ID' || key === 'isData'){
              
            
            }
            else {
                var data= {
                    range: `Customer Database!${props.template[key]}${row}`,
                    values: [[updatedUser[key]]]
   
   
                }
   
                values.push(data);

              
            }

     
          });        

        var url= 'https://sheets.googleapis.com/v4/spreadsheets/1YaUmRgz_NZeFsNBD5oxd1r8Z-x1J86IqJB7l-lRJVaQ/values:batchUpdate';
        var resource = {
        
        valueInputOption : 'RAW',
        data: values        
       };       
 
         axios.post(url,resource,{ headers: {
            Authorization: 'Bearer ' + props.user.accessToken
          }})    
            .then(() => {
            var newArray = props.customers;
            var newItem = updatedUser;

            var index = newArray.findIndex(item => item.ID === updatedUser.ID)
            
// Replace the item by index.
            newArray.splice(index, 1, newItem)

            
            props.setCustomers(newArray);
            props.setSelectedCustomer(newItem)
           
            
           
            
           })
          .then(
            props.setSelectedCustomer(updatedUser)
          )     
          .then(

        props.togglepUdate()
         
         
         
         
         )
          .catch(function (error) {
           console.log(error);
         });
     

      }



      var filter= {
 city: "city",
company_name:"Company",
country:"Country",
email:"Email address",
first_name:"First name",
last_name:"Last name",
phone1:"Phone 1",
phone2:"Phone 2",
street_number:"Street, house number",
titel:"Title",
zipcode: 'Zipcode'

      };

    return (



        <div className="customer-card"  >

            <h2 className="id-card">Update customer infos </h2>
            <h3 className="id-card">ID: {props.customer.ID} </h3> 
            <div>
                
                

             
            </div>

            <form >
              
                  
            {Object.keys(updatedUser).filter(function(item) {
  for (var key in filter) {
    if (item === key )
     return true;
  }
  return false;
}).map((keyName, item) => (

                    <label> {filter[keyName]}:
            <input className={keyName}
                defaultValue={updatedUser[keyName]}
                onChange={e => {
                    const val = e.target.value;
                    setUpdatedUser(prevState => {

                        let customer = Object.assign({}, prevState);
                        customer[keyName] = val;
                        return { ...customer }



                    }

                    )
                }} />
         </label>
                ))
                    }







               

            </form>



            <button onClick={() => props.togglepUdate()}> Go back to user</button>
            <button onClick={updateCustomer}> Save changes</button>
        </div>

    )

}



export default connect(mapStateToProps,{setCustomers,setSelectedCustomer})(CustomerUpdate);


