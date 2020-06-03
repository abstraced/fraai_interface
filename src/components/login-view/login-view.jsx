import React, { useState, useEffect } from 'react';

import GoogleLogin from 'react-google-login';



import { connect } from 'react-redux';


import { setUserInfos } from '../../actions/actions';



function responseGoogle  (response)  {
    console.log(response);
  };

function LoginView (props) {



    // const [isSignedIn, setIsSignedIn] = useState(false);
    // const [user, setUser] = useState(false);
   

    

   
       
    return (
        
        <GoogleLogin
        clientId="703753342682-pofbuml594pvb54ajushgu4ln52i7l31.apps.googleusercontent.com"
        scope="https://www.googleapis.com/auth/drive"
        buttonText="Login"
        onSuccess={res => {
          props.onLoggingIn(res);
           
        }}
        // isSignedIn={true}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      
          )
    




}

export default connect(null,{setUserInfos})(LoginView);