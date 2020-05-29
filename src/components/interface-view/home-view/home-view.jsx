import React from 'react';
import axios from 'axios';




import OrderView from '../order-view/order-view';
import CustomerView from '../customer-view/customer-view';

import LoadingView from '../../loading-view/loading-view';


import Navigation from '../../nav-bar/navigation';



const utilities = require('../../utilities');





import { BrowserRouter as Router, Route } from "react-router-dom";




import { connect } from 'react-redux';


import { setCustomers, setArticles, setOrders, setTemplates } from '../../../actions/actions';





const mapStateToProps = state => {

  return {

    customers: state.customers,
    orders: state.orders,
    templates: state.templates

  };
};




// import './home-view.scss';



class HomeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      orderByInvoice: {}

    };


  }



  // One of the "hooks" available in a React Component
  componentDidMount() {

    let Orders =JSON.parse( localStorage.getItem('Orders'));
    

    
    if (Orders === null) {
      this.importOrders();
      this.importCustomers();
     }
     else {
      
      let Articles = JSON.parse(localStorage.getItem('Articles'));
      let Customers = JSON.parse(localStorage.getItem('Customers'));
      let Template_order = JSON.parse(localStorage.getItem('Template_order'));
      let Template_customer = JSON.parse(localStorage.getItem('Template_customer'));
      

      this.props.setCustomers(Customers);
      this.props.setArticles(Articles);
      this.props.setOrders(Orders);
      this.props.setTemplates({Template_order,Template_customer});

    

     }

    

  }


  /// FETCH FROM LIST INITIAL

  importOrders() {
    axios.get('https://sheets.googleapis.com/v4/spreadsheets/1YaUmRgz_NZeFsNBD5oxd1r8Z-x1J86IqJB7l-lRJVaQ/values/API_DATA!c1:bZ500',
      {
        headers: {
          Authorization: 'Bearer ' + this.props.user.accessToken
        }
      })
      .then(response => {

        // Assign the result to the state
        let myOrderSorted = utilities.turn_rows_in_object(response.data.values);
       
        const sortedBaz = groupBy('data_InvoiceNumber');

        this.props.setArticles(myOrderSorted);
        this.props.setOrders(sortedBaz(myOrderSorted));

        this.props.setTemplates({Template_order: myOrderSorted[0],...this.props.templates});
        localStorage.setItem("Template_order", JSON.stringify(myOrderSorted[0]));


        localStorage.setItem("Articles", JSON.stringify(myOrderSorted));
        localStorage.setItem("Orders", JSON.stringify(sortedBaz(myOrderSorted)));
      })

  }

  importCustomers() {
    axios.get('https://sheets.googleapis.com/v4/spreadsheets/1YaUmRgz_NZeFsNBD5oxd1r8Z-x1J86IqJB7l-lRJVaQ/values/Customer Database!A1:O1500',
      {
        headers: {
          Authorization: 'Bearer ' + this.props.user.accessToken
        }
      })
      .then(response => {
        // Assign the result to the state
        console.log('test');
        let customers = utilities.turn_rows_in_object(response.data.values);


        this.props.setTemplates({Template_customer: customers[0],...this.props.templates});
        localStorage.setItem("Template_customer", JSON.stringify(customers[0]));



        var newArray = customers.filter(function (el) {
          return (el.isData == "yes" && el.ID  !=0 )

        })

        return newArray
      })
      .then(response => {
        this.props.setCustomers(response);
        localStorage.setItem("Customers", JSON.stringify(response));

      })
      .catch(function (error) {
        console.log(error);
      })
  }





  render() {

    const state = this.state;





    if (!state) return <LoadingView />;



    return (

      <Router >

        <Navigation />

        <Route exact path="/" render={() =>
          <div> Welcome Sir</div>


        } />



        <Route path="/customers" render={() => <CustomerView isStandalone={true} />} />

        <Route path="/customer/:customerId" render={({ match }) => {
          if (!this.props.customers) return <LoadingView />;
          return <CustomerView 
          isStandalone={true} 
          view='selected' 
          customer={this.props.customers.find(m => m.ID === match.params.customerId)}  />
        }
        } />





        <Route exact path="/orders" render={() => <OrderView isStandalone={true} />} />
        
        
        <Route path="/orders/create" render={() => 
        <OrderView isStandalone={true} 
        view='create'  
        order={this.props.templates.Template_order}
        />} />


        <Route path="/order/:orderId" render={({ match }) => {
          if (!this.props.orders)    return <LoadingView />;
          return <OrderView  
          isStandalone={true}
          view='selected' 
          order={this.props.orders[Object.keys(this.props.orders).find(m => m === match.params.orderId)]} 
          />
        }
        } />
        



      </Router>







    );
  }
}



export default connect(mapStateToProps, { setCustomers, setArticles, setOrders, setTemplates })(HomeView);






//// Fetch utility

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});






//   <Navigation 
//   goBackToHome={() => this.onBackToList()}
//   disconnect={() => disconnect()}

//   /> 
//   <CustomerView 
//   updateCustomers={() => this.importCustomers()} 
//   user={this.props.user}  
//   customers={state.customers} />
// <div className="content">

// { state.selectedOrder ?   
// <OrderView order={state.selectedOrder}  onClick={() => this.onBackToList()} />

// : Object.keys(state.orderByInvoice).map((keyName, item) => (

// <OrderCard key={item} order={state.orderByInvoice[keyName]} onClick={order => this.onOrderClick(order)} />

//  ))}
// </div>

// <Route path="/directors/:id" render={({ match }) => {
//         if (!movies) return <div className="main-view" />;
//         return <DirectorView director=
//         {movies.find(m => m.director._id === match.params.id).director} />
//       }
//       } />
//       <Route path="/genres/:id" render={({ match }) => {
//         if (!movies) return <div className="main-view" />;
//         return <GenreView genre=
//         {movies.find(m => m.genre._id === match.params.id).genre} />
//       }
//       } />