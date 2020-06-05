import React, { useState, useEffect } from "react";

import axios from "axios";

/// IMPORT PAGE COMPONENTS
import LoginView from "../login-view/login-view";
import Navigation from "../nav-bar/navigation";
import OrderView from "../interface-view/order-view/order-view";
import CustomerView from "../interface-view/customer-view/customer-view";
import LoadingView from "../loading-view/loading-view";



const utilities = require("../utilities");

import { BrowserRouter as Router, Route } from "react-router-dom";

/// REDUX

import { connect } from "react-redux";
import {
  setCustomers,
  setArticles,
  setOrders,
  setTemplates,

} from "../../actions/actions";




///  GET STATE FROM REDUX AS PROPS
const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    orders: state.orders,
    templates: state.templates,
  };
};





function MainView(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState();

  
  // useStateWithCallback(null, (user) => {
  //   let LocalOrders = JSON.parse(localStorage.getItem("Orders"));
    
  //   if (user !== null && props.orders.length<1 ) {
  //     if (!LocalOrders) {
  //       importOrders();
  //       importCustomers();

  //     }
  //     else {
  //       let Articles = JSON.parse(localStorage.getItem("Articles"));
  //       let Customers = JSON.parse(localStorage.getItem("Customers"));
  //       let Template_order = JSON.parse(localStorage.getItem("Template_order"));
  //       let Template_customer = JSON.parse(
  //         localStorage.getItem("Template_customer")
  //       );
  
  //       props.setCustomers(Customers);
  //       props.setArticles(Articles);
  //       props.setOrders(LocalOrders);
  //       props.setTemplates({ Template_order, Template_customer });
  
        


  //     }
     
  //   } else {
  //     console.log("ne fais rien");
  //   }
  // });

  useEffect(() => {
    let LocalUser = JSON.parse(localStorage.getItem("user"));

    if (LocalUser) {
      setIsUserLoggedIn(true);

      let LocalOrders = JSON.parse(localStorage.getItem("Orders"));
      if (!LocalOrders) {
              importOrders(LocalUser);
              importCustomers(LocalUser);
      
            }
            else {
              let Articles = JSON.parse(localStorage.getItem("Articles"));
              let Customers = JSON.parse(localStorage.getItem("Customers"));
              let Template_order = JSON.parse(localStorage.getItem("Template_order"));
              let Template_customer = JSON.parse(
                localStorage.getItem("Template_customer")
              );
        
              props.setCustomers(Customers);
              props.setArticles(Articles);
              props.setOrders(LocalOrders);
              props.setTemplates({ Template_order, Template_customer });



    }

  //// STATE DATA IS LOADED =   async

  }




    

      
    
  }, []);

  const onLoggingIn = (user) => {
    setIsUserLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
    importOrders(user);
    importCustomers(user);
  };

  const importOrders = (user) => {
    axios
      .get(
        "https://sheets.googleapis.com/v4/spreadsheets/1YaUmRgz_NZeFsNBD5oxd1r8Z-x1J86IqJB7l-lRJVaQ/values/API_DATA!c1:bZ500",
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
      .then((response) => {
        // Assign the result to the state
        let myOrderSorted = utilities.turn_rows_in_object(response.data.values);

        const sortedBaz = groupBy("data_InvoiceNumber");

        props.setArticles(myOrderSorted);
        props.setOrders(sortedBaz(myOrderSorted));

        props.setTemplates({
          Template_order: myOrderSorted[0],
          ...props.templates,
        });
        localStorage.setItem(
          "Template_order",
          JSON.stringify(myOrderSorted[0])
        );

        localStorage.setItem("Articles", JSON.stringify(myOrderSorted));
        localStorage.setItem(
          "Orders",
          JSON.stringify(sortedBaz(myOrderSorted))
        );
      });
  };

  const importCustomers = (user) => {
    axios
      .get(
        "https://sheets.googleapis.com/v4/spreadsheets/1YaUmRgz_NZeFsNBD5oxd1r8Z-x1J86IqJB7l-lRJVaQ/values/Customer Database!A1:O1500",
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
      .then((response) => {
        // Assign the result to the state
        console.log("test");
        let customers = utilities.turn_rows_in_object(response.data.values);

        props.setTemplates({
          Template_customer: customers[0],
          ...props.templates,
        });
        localStorage.setItem("Template_customer", JSON.stringify(customers[0]));

        var newArray = customers.filter(function (el) {
          return el.isData == "yes" && el.ID != 0;
        });

        return newArray;
      })
      .then((response) => {
        props.setCustomers(response);
        localStorage.setItem("Customers", JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Router basename="/fraai_interface">
      <Navigation isConnected={isUserLoggedIn ? true : false} onLogOut={setIsUserLoggedIn} />

      <Route exact   path="/"
        render={() => {
          if (!isUserLoggedIn) return <LoginView onLoggingIn={onLoggingIn} />;
          return <div> Home Page</div>;
        }}
      />

      <Route
        path="/customers"
        render={() => <CustomerView isStandalone={true} />}
      />

      <Route
        path="/customer/:customerId"
        render={({ match }) => {
          if (!props.customers) return <LoadingView />;
          return (
            <CustomerView
              isStandalone={true}
              view="selected"
              customer={props.customers.find(
                (m) => m.ID === match.params.customerId
              )}
            />
          );
        }}
      />

      <Route
        exact
        path="/orders"
        render={() => <OrderView 
         
        isStandalone={true} />}
      />

      {/* <Route
        path="/orders/create"
        render={() => (
          <OrderView
            isStandalone={true}
            view="create"
            order={props.templates.Template_order}
          />
        )}
      /> */}

      <Route
        path="/order/:orderId"
        render={({ match }) => {
          if (!props.orders) return <LoadingView />;
          return (
            <OrderView
              user={user}
              isStandalone={true}
              view="selected"
              order={
                props.orders[
                  Object.keys(props.orders).find(
                    (m) => m === match.params.orderId
                  )
                ]
              }
            />
          );
        }}
      />
    </Router>
  );
}

export default connect(mapStateToProps, {
  setCustomers,
  setArticles,
  setOrders,
  setTemplates,
})(MainView);

//// Fetch utility

const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
