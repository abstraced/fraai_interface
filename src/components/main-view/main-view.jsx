import React, { useState, useEffect  } from 'react';

import axios from 'axios';


import LoginView from '../login-view/login-view';
import HomeView from '../interface-view/home-view/home-view';



import { connect } from 'react-redux';





const mapStateToProps = state => {

  return { user: state.userInfos,
         
   };
};






 function MainView (props) {






  return (
    

    <div className="app">
    { Object.keys(props.user).length<2 ? 
    <LoginView />  
    :
    <HomeView user={props.user} disconnect={() => this.disconnect()} />
    }
        
    
    </div>




  );

 }


 
export default connect(mapStateToProps)(MainView);