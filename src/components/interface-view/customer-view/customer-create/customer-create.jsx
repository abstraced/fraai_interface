import React, { useState, useEffect } from 'react';


import axios from 'axios';
var _ = require('lodash');

import Modal from '../../modal/modal';





import { connect } from 'react-redux';


import { setCustomers, setSelectedCustomer } from '../../../../actions/actions';


const mapStateToProps = state => {
  

    return { customers: state.customers,
        user: state.userInfos
           
     };
  };



 function CustomerCreate(props) {



    const [updatedUser, setUpdatedUser] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [messageModal, setMessageModal] = useState('');

  

    useEffect(() => {

        var newId= getEmptyRow().length+1;
        var createdUser= props.template;
        createdUser = _.mapValues(createdUser, () => '');
        createdUser.ID= newId;
        createdUser.isData= 'yes';


        setUpdatedUser(createdUser)


        
    }, [props]);


  const getEmptyRow =()=> {
    var maxid = 0;

   
   var high=  props.customers.map(function(obj){     
    if (parseInt(obj.ID) > maxid) maxid =parseInt(obj.ID);    
});

    return high;
    

  }

   function toggleModal ()  {
    setIsShowing(!isShowing)
    }

    

    const createCustomer =() => {

        var newId= getEmptyRow().length+1;
        var row = newId+3;
        
        var values =[{
            range: `Customer Database!A${row}`,
            values: [[newId]]


        },
        {
            range: `Customer Database!O${row}`,
            values: [['yes']]


        }
    ];

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
          .then (
            console.log(typeof props.customers)
            

          )
          .then(() => {
            var newArray = props.customers;
            var newItem = updatedUser;
            newArray[newId -1]=updatedUser;

//             var index = newArray.findIndex(item => item.ID === updatedUser.ID)
            
// // Replace the item by index.
//             newArray.splice(index, 1, newItem)

            
            props.setCustomers(newArray);

            localStorage.setItem("Customers", JSON.stringify(newArray));


            props.setSelectedCustomer(newItem);


           
            
           
            
           })
        //    .then (
        //      setCustomers({
        //          ...props.customers,
        //          updatedUser
        //      })  
        //    )
          .then(
            props.setSelectedCustomer(updatedUser)
          )     
          .then(
              props.changeView('selected')

                    
         
         
         
         
         )
          .catch(function (error) {
           console.log(error);
         });
     

      }

    return (



        <div className="customer-card"  >

            <h2 className="id-card">Create customer</h2>
            
            <div>
                
                

                <Modal
                    className="modal"
                    show={isShowing}
                    close={toggleModal}>
                       {messageModal}
                </Modal>
            </div>

            <form >

            {Object.keys(props.template).map((keyName, item) => (
    ( keyName != 'isData' && keyName != 'ID' )?
                     <label> {keyName}:
             <input className={keyName}
              defaultValue=""
                 
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
          : <div>  </div>
         ))
             }

              
                  
         






               

            </form>



            <button onClick={() => {props.changeView('list', null)}}> Go back to user</button>
            <button onClick={createCustomer}> Save changes</button>
        </div>

    )

}



export default connect(mapStateToProps,{setCustomers,setSelectedCustomer})(CustomerCreate);


