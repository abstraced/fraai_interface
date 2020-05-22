// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_TEMPLATES,SET_FILTER, SET_ORDERS,SET_SELECTEDORDER, SET_ARTICLES,SET_USERINFOS, SET_CUSTOMERS,SET_SELECTEDCUSTOMER } from '../actions/actions';


function templates(state = [], action) {
  switch (action.type) {
    case SET_TEMPLATES:
      return action.value;
    default:
      return state;
  }
}



function orders(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.value;
    default:
      return state;
  }
}

function selectedOrder(state = {}, action) {
  switch (action.type) {
    case SET_SELECTEDORDER:
      return action.value;
    default:
      return state;
  }
}

function articles(state = [], action) {
  switch (action.type) {
    case SET_ARTICLES:
      return action.value;
    default:
      return state;
  }
}

function customers(state = [], action) {
  switch (action.type) {
    case SET_CUSTOMERS:
      return action.value;
    default:
      return state;
  }
}


function selectedCustomer(state = null, action) {
  switch (action.type) {
    case SET_SELECTEDCUSTOMER:
      return action.value;
    default:
      return state;
  }
}


function userInfos (state={},action){
  switch (action.type) {
    case SET_USERINFOS:
        return action.value;
        default:
            return state;
  }
}


function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}



const interfaceApp = combineReducers({
  templates,
  visibilityFilter,
  orders,
  selectedOrder,
  articles,
  customers,
  selectedCustomer,
  userInfos
});

export default interfaceApp;