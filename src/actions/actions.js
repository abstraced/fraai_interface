
// src/actions/actions.js


export const SET_TEMPLATES = 'SET_TEMPLATES';

export function setTemplates(value) {
  return { type: SET_TEMPLATES, value };
}




export const SET_ORDERS = 'SET_ORDERS';

export function setOrders(value) {
  return { type: SET_ORDERS, value };
}


export const SET_SELECTEDORDER = 'SET_SELECTEDORDER';

export function setSelectedOrder(value) {
  return { type: SET_SELECTEDORDER, value };
}




export const SET_ARTICLES = 'SET_ARTICLES';

export function setArticles(value) {
  return { type: SET_ARTICLES, value };
}



export const SET_CUSTOMERS = 'SET_CUSTOMERS';

export function setCustomers(value) {
  return { type: SET_CUSTOMERS, value };
}


export const SET_SELECTEDCUSTOMER = 'SET_SELECTEDCUSTOMER';

export function setSelectedCustomer(value) {
  return { type: SET_SELECTEDCUSTOMER, value };
}




export const SET_USERINFOS = 'SET_USERINFOS';

export function setUserInfos(value) {
  return { type: SET_USERINFOS, value}

}



export const SET_FILTER = 'SET_FILTER';
export function setFilter(value) {
  return { type: SET_FILTER, value };
}











